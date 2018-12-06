import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import StegSelectors from '../utils/stegSelectors';

export default class RelasjonTilBarnFødselPM {
    erBarnetFødt: Selector;
    antallBarn: Selector;
    antallBarnSelect: Selector;
    fødselsdato: Selector;

    constructor() {
        this.erBarnetFødt = TestUtils.getRadioPanelGruppe('barnFødt');
        this.antallBarn = TestUtils.getRadioPanelGruppe('antallBarn');
        this.antallBarnSelect = Selector('select[name="antallBarnSelect"]');
        this.fødselsdato = Selector('#fødselsdato');
    }

    async velgBarnetErFødt(t: TestController, født: boolean) {
        await TestUtils.selectRadioVerdi(t, this.erBarnetFødt, født ? 'ja' : 'nei');
    }

    async velgAntallBarn(t: TestController, antall: number = 1) {
        if (antall <= 3) {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, `${antall}`);
        } else {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, '3');
            await t.click(this.antallBarnSelect);
            await t.click(this.antallBarnSelect.find(`option[value="${antall}"]`));
        }
    }

    async setFødselsdato(t: TestController, dato?: Date) {
        await TestUtils.setDato(t, this.fødselsdato, dato || new Date());
    }

    async fødtBarn(t: TestController) {
        await t.expect(StegSelectors.fortsettKnapp.exists).notOk();

        await this.velgBarnetErFødt(t, true);
        await this.velgAntallBarn(t, 1);
        await this.setFødselsdato(t, new Date());

        await t.expect(StegSelectors.fortsettKnapp.hasAttribute('disabled')).notOk();
    }
}

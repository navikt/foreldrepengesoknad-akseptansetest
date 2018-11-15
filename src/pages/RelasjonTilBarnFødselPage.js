import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import StegSelectors from '../utils/stegSelectors';

export default class RelasjonTilBarnFødselPM {
    erBarnetFødt;
    antallBarn;
    antallBarnSelect;
    fødselsdato;

    constructor() {
        this.erBarnetFødt = TestUtils.getRadioPanelGruppe('barnFødt');
        this.antallBarn = TestUtils.getRadioPanelGruppe('antallBarn');
        this.antallBarnSelect = Selector('select[name="antallBarnSelect"]');
        this.fødselsdato = Selector('#fødselsdato');
    }

    async velgBarnetErFødt(t, født) {
        await TestUtils.selectRadioVerdi(t, this.erBarnetFødt, født ? 'ja' : 'nei');
    }

    async velgAntallBarn(t, antall = 1) {
        if (antall <= 3) {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, `${antall}`);
        } else {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, '3');
            await t.click(this.antallBarnSelect);
            await t.click(this.antallBarnSelect.find(`option[value="${antall}"]`));
        }
    }

    async setFødselsdato(t, dato) {
        await TestUtils.setDato(t, this.fødselsdato, dato || new Date());
    }

    async fødtBarn(t) {
        await t.expect(StegSelectors.fortsettKnapp.exists).notOk();

        await this.velgBarnetErFødt(t, true);
        await this.velgAntallBarn(t, 1);
        await this.setFødselsdato(t, new Date());

        await t.expect(StegSelectors.fortsettKnapp.hasAttribute('disabled')).notOk();

        await TestUtils.fortsett(t);
    }
}

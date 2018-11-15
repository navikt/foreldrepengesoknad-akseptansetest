import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';

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

    async velgAntallBarn(t: TestController, antall: number) {
        if (antall <= 3) {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, `${antall}`);
        } else {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, '3');
            await t.click(this.antallBarnSelect);
            await t.click(this.antallBarnSelect.find(`option[value="${antall}"]`));
        }
    }

    async setFødselsdato(t: TestController, dato: Date) {
        await TestUtils.setDato(t, this.fødselsdato, new Date());
    }

    async fødtBarn(t: TestController) {
        await this.velgBarnetErFødt(t, true);
        await this.velgAntallBarn(t, 1);
        await this.setFødselsdato(t, new Date());
        await TestUtils.fortsett(t);
    }
}

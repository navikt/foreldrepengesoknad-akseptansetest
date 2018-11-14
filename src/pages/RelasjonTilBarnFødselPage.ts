import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';

export default class RelasjonTilBarnFødselPM {
    erBarnetFødt: Selector;
    antallBarn: Selector;
    fødselsdato: Selector;

    constructor() {
        this.erBarnetFødt = TestUtils.getRadioPanelGruppe('barnFødt');
        this.antallBarn = TestUtils.getRadioPanelGruppe('antallBarn');
        this.fødselsdato = Selector('#fødselsdato');
    }

    async velgBarnetErFødt(t: TestController, født: boolean) {
        await TestUtils.selectRadioVerdi(t, this.erBarnetFødt, født ? 'ja' : 'nei');
    }

    async velgAntallBarn(t: TestController, antall: number) {
        await TestUtils.selectRadioVerdi(t, this.antallBarn, `${antall}`);
    }

    async setFødselsdato(t: TestController, dato: Date) {
        await TestUtils.setDato(t, this.fødselsdato, new Date());
    }

    async caseFødtBarn(t: TestController) {
        await this.velgBarnetErFødt(t, true);
        await this.velgAntallBarn(t, 1);
        await this.setFødselsdato(t, new Date());
        await TestUtils.fortsett(t);
    }
}

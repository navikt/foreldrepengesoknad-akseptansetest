import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

export default class VelkommenPageModel {
    bekreftVilkår: Selector;
    startSøknadKnapp: Selector;
    søknadstypeRb: Selector;
    velkommenTittel: Selector;

    constructor() {
        this.bekreftVilkår = Selector('.bekreftCheckboksPanel input[type=checkbox]');
        this.startSøknadKnapp = Selector('.velkommen__startSøknadKnapp');
        this.søknadstypeRb = Selector('input[name="søknadstype"]');
        this.velkommenTittel = Selector('.velkommen__tittel');
    }

    async aksepterVilkår(t: TestController) {
        await t.click(this.bekreftVilkår);
    }

    async clickStartSøknad(t: TestController) {
        await t.click(this.startSøknadKnapp);
    }

    async startFørstegangssøknad(t: TestController) {
        const erEndringssøknad = await this.søknadstypeRb.exists;
        if (erEndringssøknad) {
            await TestUtils.selectRadio(t, 'søknadstype', 'nei');
            await this.aksepterVilkår(t);
            await this.clickStartSøknad(t);
        } else {
            await this.aksepterVilkår(t);
            await this.clickStartSøknad(t);
        }
    }
}

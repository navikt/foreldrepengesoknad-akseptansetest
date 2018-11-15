import { Selector } from 'testcafe';

export default class VelkommenPageModel {
    bekreftVilkår: Selector;
    startSøknadKnapp: Selector;

    constructor() {
        this.bekreftVilkår = Selector('.bekreftCheckboksPanel input[type=checkbox]');
        this.startSøknadKnapp = Selector('.velkommen__startSøknadKnapp');
    }

    async aksepterVilkår(t: TestController) {
        await t.click(this.bekreftVilkår);
    }

    async clickStartSøknad(t: TestController) {
        await t.click(this.startSøknadKnapp);
    }

    async startFørstegangssøknad(t: TestController) {
        await this.aksepterVilkår(t);
        await this.clickStartSøknad(t);
    }
}

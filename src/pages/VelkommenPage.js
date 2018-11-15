import { Selector } from 'testcafe';

export default class VelkommenPageModel {
    bekreftVilkår;
    startSøknadKnapp;

    constructor() {
        this.bekreftVilkår = Selector('.bekreftCheckboksPanel input[type=checkbox]');
        this.startSøknadKnapp = Selector('.velkommen__startSøknadKnapp');
    }

    async aksepterVilkår(t) {
        await t.click(this.bekreftVilkår);
    }

    async clickStartSøknad(t) {
        await t.click(this.startSøknadKnapp);
    }

    async startFørstegangssøknad(t) {
        await this.aksepterVilkår(t);
        await this.clickStartSøknad(t);
    }
}

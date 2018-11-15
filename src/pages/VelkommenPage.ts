import { Selector } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

export default class VelkommenPageModel {
    bekreftVilkår: Selector;
    startSøknadKnapp: Selector;

    constructor() {
        const bekreftCheckboksPanel = ReactSelector('BekreftCheckboksPanel');
        this.bekreftVilkår = bekreftCheckboksPanel.find('input[type=checkbox]');
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

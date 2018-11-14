import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

export default class OppsummeringPage {
    bekreftVilkår: Selector;

    constructor() {
        this.bekreftVilkår = Selector('.bekreftCheckboksPanel input[type=checkbox]');
    }

    async sendSøknad(t: TestController) {
        await t.click(this.bekreftVilkår);
        await TestUtils.fortsett(t);
    }
}

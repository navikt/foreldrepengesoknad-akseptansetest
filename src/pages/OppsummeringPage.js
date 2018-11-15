import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

export default class OppsummeringPage {
    bekreftVilkår;

    constructor() {
        this.bekreftVilkår = Selector('.bekreftCheckboksPanel input[type=checkbox]');
    }

    async sendSøknad(t) {
        await t.click(this.bekreftVilkår);
        await TestUtils.fortsett(t);
    }
}

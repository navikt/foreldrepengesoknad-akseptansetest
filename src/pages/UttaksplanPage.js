import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';

export default class UttaksplanPage {
    planlegger;

    constructor() {
        this.planlegger = Selector('uttaksplanlegger');
    }

    async standard(t) {
        await TestUtils.fortsett(t);
    }
}

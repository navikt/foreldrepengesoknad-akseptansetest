import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';

export default class UttaksplanPage {
    planlegger: Selector;

    constructor() {
        this.planlegger = Selector('uttaksplanlegger');
    }

    async standard(t: TestController) {
        await TestUtils.fortsett(t);
    }
}

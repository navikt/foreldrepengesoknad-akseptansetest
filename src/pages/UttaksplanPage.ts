import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import Uttaksplan from '../modules/Uttaksplan';

export default class UttaksplanPage {
    planlegger: Selector;

    constructor() {
        this.planlegger = Selector('uttaksplanlegger');
    }

    async standard(t: TestController) {}

    async fyllUtFar(t: TestController) {
        const uttaksplan = new Uttaksplan();
        await uttaksplan.leggTilPeriode(t);
    }
}

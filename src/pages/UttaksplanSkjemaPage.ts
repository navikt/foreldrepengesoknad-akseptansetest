import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import { config } from '../../config';

export default class UttaksplanSkjemaPage {
    dekningsgradRadio: Selector;
    permisjonStartdatoInput: Selector;
    skalIkkeHaUttakCb: Selector;
    fellesperiodeRange: Selector;

    constructor() {
        this.dekningsgradRadio = TestUtils.getRadioPanelGruppe('dekningsgrad');
        this.permisjonStartdatoInput = Selector('#permisjonStartdato');
        this.skalIkkeHaUttakCb = Selector('input[name="skalIkkeHaUttakFørTermin"]');
        this.fellesperiodeRange = Selector('.rangeInput');
    }

    async standard(t: TestController) {
        await TestUtils.selectRadioVerdi(t, this.dekningsgradRadio, '100');
    }

    async velgAntallUkerFelles(t: TestController, antallUker: number) {
        await TestUtils.selectRangeValue(t, this.fellesperiodeRange, antallUker);
    }
}

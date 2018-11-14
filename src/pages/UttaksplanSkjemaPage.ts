import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import { config } from '../../config';

export default class UttaksplanSkjemaPage {
    dekningsgradRadio: Selector;
    permisjonStartdatoInput: Selector;
    skalIkkeHaUttakCb: Selector;

    constructor() {
        this.dekningsgradRadio = TestUtils.getRadioPanelGruppe('dekningsgrad');
        this.permisjonStartdatoInput = Selector('#permisjonStartdato');
        this.skalIkkeHaUttakCb = Selector('input[name="skalIkkeHaUttakFørTermin"]');
    }

    async standard(t: TestController) {
        await TestUtils.selectRadioVerdi(t, this.dekningsgradRadio, '100');
        await TestUtils.fortsett(t);
    }
}

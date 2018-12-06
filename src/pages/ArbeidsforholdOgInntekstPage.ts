import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';

export default class ArbeidsforholdOgInntektPage {
    async standard(t: TestController) {
        TestUtils.selectRadio(t, 'harJobbetSomFrilansSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'annenInntekt', 'nei');
    }
}

import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';

export default class ArbeidsforholdOgInntektPage {
    async standard(t) {
        TestUtils.selectRadio(t, 'harJobbetSomFrilansSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'annenInntekt', 'nei');
        TestUtils.fortsett(t);
    }
}

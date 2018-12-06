import TestUtils from '../utils/testutils';
import FrilandsBolk from '../modules/FrilansBolk';

export default class ArbeidsforholdOgInntektPage {
    async standard(t: TestController) {
        TestUtils.selectRadio(t, 'harJobbetSomFrilansSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', 'nei');
        TestUtils.selectRadio(t, 'annenInntekt', 'nei');
    }

    async fyllUtFrilans(t: TestController) {
        const frilansBolk = new FrilandsBolk();
        await frilansBolk.fyllUtHarJobbetFrilans(t);
    }
}

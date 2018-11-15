import TestUtils from '../utils/testutils';

export default class UtenlandsoppholdPage {
    async standard(t: TestController) {
        TestUtils.selectRadio(t, 'boddINorgeSiste12Mnd', 'ja');
        TestUtils.selectRadio(t, 'iNorgeNeste12Mnd', 'ja');
        TestUtils.selectRadio(t, 'iNorgePåHendelsestidspunktet', 'ja');
        TestUtils.fortsett(t);
    }
}

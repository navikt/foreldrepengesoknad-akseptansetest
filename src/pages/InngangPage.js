import TestUtils from '../utils/testutils';

export default class InngangPageModel {
    søkersituasjon;
    søkerrolle;

    constructor() {
        this.søkersituasjon = TestUtils.getRadioPanelGruppe('søkersituasjon');
        this.søkerrolle = TestUtils.getRadioPanelGruppe('søkerrolle');
    }

    async selectSøkersituasjon(t, situasjon) {
        await TestUtils.selectRadioVerdi(t, this.søkersituasjon, situasjon);
    }

    async selectSøkerrolle(t, rolle) {
        await TestUtils.selectRadioVerdi(t, this.søkerrolle, rolle);
    }

    async fødselMor(t) {
        await this.selectSøkersituasjon(t, 'fødsel');
        await this.selectSøkerrolle(t, 'MOR');
        await TestUtils.fortsett(t);
    }
}

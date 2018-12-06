import TestUtils from '../utils/testutils';

export default class InngangPageModel {
    søkersituasjon: Selector;
    søkerrolle: Selector;

    constructor() {
        this.søkersituasjon = TestUtils.getRadioPanelGruppe('søkersituasjon');
        this.søkerrolle = TestUtils.getRadioPanelGruppe('søkerrolle');
    }

    async selectSøkersituasjon(t: TestController, situasjon: string) {
        await TestUtils.selectRadioVerdi(t, this.søkersituasjon, situasjon);
    }

    async selectSøkerrolle(t: TestController, rolle: string) {
        await TestUtils.selectRadioVerdi(t, this.søkerrolle, rolle);
    }

    async fødselMor(t: TestController) {
        await this.selectSøkersituasjon(t, 'fødsel');
        await this.selectSøkerrolle(t, 'MOR');
    }
}

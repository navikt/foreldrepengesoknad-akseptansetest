import TestUtils from '../utils/testutils';
import LoginPage from '../pages/LoginPage';
import InngangPage from '../pages/InngangPage';
import VelkommenPage from '../pages/VelkommenPage';
import RelasjonTilBarnFødselPage from '../pages/RelasjonTilBarnFødselPage';
import AnnenForelderPage from '../pages/AnnenForelderPage';
import UttaksplanSkjemaPage from '../pages/UttaksplanSkjemaPage';
import UttaksplanPage from '../pages/UttaksplanPage';
import UtenlandsoppholdPage from '../pages/UtenlandsoppholdPage';
import ArbeidsforholdOgInntektPage from '../pages/ArbeidsforholdOgInntekstPage';
import OppsummeringPage from '../pages/OppsummeringPage';

import { config } from '../../config';
import { Selector } from 'testcafe';

const loginPage = new LoginPage();
const inngangPage = new InngangPage();
const velkommenPage = new VelkommenPage();
const relasjonTilBarnetPage = new RelasjonTilBarnFødselPage();
const annenForelderPage = new AnnenForelderPage();
const uttaksplanSkjemaPage = new UttaksplanSkjemaPage();
const uttaksplanPage = new UttaksplanPage();
const utenlandsoppholdPage = new UtenlandsoppholdPage();
const arbeidOgInntektPage = new ArbeidsforholdOgInntektPage();
const oppsummeringPage = new OppsummeringPage();

fixture(`Foreldrepengesøknad`).beforeEach(async t => {
    if (config.skipLogin) {
        return;
    }
    await t.useRole(loginPage.login(config.fnr_default));
});

export const startAndResetSøknad = async (t: TestController) => {
    await TestUtils.waitForInitialDataLoaded();
    const path = await TestUtils.getPath();
    if (path !== '/velkommen') {
        await TestUtils.avbrytSøknad(t);
    }
};

test('Verifiser standard søknad', async t => {
    await t.navigateTo(config.url);
    await startAndResetSøknad(t);

    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await relasjonTilBarnetPage.fødtBarn(t);
    await annenForelderPage.farMedmorDeltOmsorg(t);
    await uttaksplanSkjemaPage.standard(t);
    await uttaksplanPage.standard(t);
    await utenlandsoppholdPage.standard(t);
    await arbeidOgInntektPage.standard(t);
    await oppsummeringPage.sendSøknad(t);

    await t.expect(Selector('.søknadSendt').exists).eql(true);
});
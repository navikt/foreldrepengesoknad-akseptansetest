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
    const host = await TestUtils.getHost();
    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(config.fnr_default));
    }
});

export const startAndResetSøknad = async (t: TestController, cnt: number) => {
    await t.navigateTo(config.url);

    const host = await TestUtils.getHost();
    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(config.fnr_default));
    }

    await TestUtils.waitForInitialDataLoaded();
    await t.wait(1000); // Wait for redirect if user has temporary storage
    const path: string = await TestUtils.getPath();
    if (path.indexOf('soknad') >= 0) {
        await TestUtils.avbrytSøknad(t);
    } else if (path.indexOf('velkommen') === -1) {
        if (cnt < 3) {
            await startAndResetSøknad(t, cnt++);
        }
    }
};

test('Reset søknad', async t => {
    await startAndResetSøknad(t, 0);
    await t.expect(velkommenPage.velkommenTittel.exists).eql(true);
});

test('Standard søknad mor', async t => {
    await startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await relasjonTilBarnetPage.fødtBarn(t);
    await annenForelderPage.farMedmorDeltOmsorg(t);
    await uttaksplanSkjemaPage.standard(t);
    await uttaksplanPage.standard(t);
    await utenlandsoppholdPage.ingenUtenlandsopphold(t);
    await arbeidOgInntektPage.standard(t);
    await oppsummeringPage.sendSøknad(t);
    await t.expect(Selector('.søknadSendt', { timeout: 20000 }).exists).eql(true);
});

test('Komplett førstegangssøknad mor', async t => {
    await startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await relasjonTilBarnetPage.fødtBarn(t);
    await annenForelderPage.farMedmorDeltOmsorg(t);
    await uttaksplanSkjemaPage.standard(t);
    await uttaksplanPage.standard(t);
    await utenlandsoppholdPage.ingenUtenlandsopphold(t);
    TestUtils.fortsett(t);
    await arbeidOgInntektPage.standard(t);
    await oppsummeringPage.sendSøknad(t);
    await t.expect(Selector('.søknadSendt', { timeout: 20000 }).exists).eql(true);
});

test('Utenlandsopphold', async t => {
    await t.navigateTo('http://localhost:8080/soknad/utenlandsopphold');
    await utenlandsoppholdPage.medUtenlandsopphold(t);
});

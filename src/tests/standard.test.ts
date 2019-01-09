import TestUtils from '../utils/testutils';
import LoginPage from '../pages/LoginPage';
import InngangPage from '../pages/InngangPage';
import VelkommenPage from '../pages/VelkommenPage';
import RelasjonTilBarnPage from '../pages/RelasjonTilBarnPage';
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
const relasjonTilBarnPage = new RelasjonTilBarnPage();
const annenForelderPage = new AnnenForelderPage();
const uttaksplanSkjemaPage = new UttaksplanSkjemaPage();
const uttaksplanPage = new UttaksplanPage();
const utenlandsoppholdPage = new UtenlandsoppholdPage();
const arbeidOgInntektPage = new ArbeidsforholdOgInntektPage();
const oppsummeringPage = new OppsummeringPage();

fixture(`Foreldrepengesøknad`);

const setParent = async (t: TestController, fnr: string) => {
    if (config.skipLogin) {
        return;
    }

    await t.useRole(loginPage.login(fnr));
    const host = await TestUtils.getHost();

    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(fnr));
    }
};

export const startAndResetSøknad = async (t: TestController, cnt: number) => {
    await t.navigateTo(config.url);

    const host = await TestUtils.getHost();
    if (host && host.indexOf('login.microsoftonline.com') >= 0) {
        await t.useRole(loginPage.login(config.fnr_default_mor));
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

test.before(async t => setParent(t, config.fnr_default_mor))(
    'Reset søknad',
    async t => {
        await startAndResetSøknad(t, 0);
        await t.expect(velkommenPage.velkommenTittel.exists).eql(true);
    }
);

test.before(async t => {
    return setParent(t, config.fnr_default_mor);
})('Komplett førstegangssøknad fødsel mor', async t => {
    await startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await TestUtils.gåVidere(t);
    await relasjonTilBarnPage.fødtBarn(t);
    await TestUtils.gåVidere(t);
    await annenForelderPage.farMedmorDeltOmsorg(t);
    await TestUtils.gåVidere(t);
    await uttaksplanSkjemaPage.standard(t);
    await TestUtils.gåVidere(t);
    await uttaksplanPage.standard(t);
    await TestUtils.gåVidere(t);
    await utenlandsoppholdPage.medUtenlandsopphold(t);
    await TestUtils.gåVidere(t);
    await arbeidOgInntektPage.standard(t);
    await arbeidOgInntektPage.fyllUtFrilans(t);
    await arbeidOgInntektPage.fyllUtSelvstendigNæringsdrivende(t);
    await arbeidOgInntektPage.fyllUtAnnenInntektJobbIUtlandet(t);
    await TestUtils.gåVidere(t);
    await oppsummeringPage.aksepterVilkår(t);
    await TestUtils.gåVidere(t);
    await t
        .expect(Selector('.søknadSendt', { timeout: 20000 }).exists)
        .eql(true);
});

test.before(async t => setParent(t, config.fnr_default_farmedmor))(
    'Komplett førstegangssøknad fødsel far',
    async t => {
        await startAndResetSøknad(t, 0);
        await velkommenPage.startFørstegangssøknad(t);
        await inngangPage.fødselFar(t);
        await TestUtils.gåVidere(t);
        await relasjonTilBarnPage.fødtBarn(t);
        await TestUtils.gåVidere(t);
        await annenForelderPage.farMedmorDeltOmsorg(t);
        await TestUtils.gåVidere(t);
        await uttaksplanSkjemaPage.standard(t);
        await TestUtils.gåVidere(t);
        await uttaksplanPage.standard(t);
        await uttaksplanPage.fyllUtFar(t);
        await TestUtils.gåVidere(t);
        await utenlandsoppholdPage.medUtenlandsopphold(t);
        await TestUtils.gåVidere(t);
        await arbeidOgInntektPage.standard(t);
        await arbeidOgInntektPage.fyllUtFrilans(t);
        await arbeidOgInntektPage.fyllUtSelvstendigNæringsdrivende(t);
        await arbeidOgInntektPage.fyllUtAnnenInntektJobbIUtlandet(t);
        await TestUtils.gåVidere(t);
        await oppsummeringPage.aksepterVilkår(t);
        await TestUtils.gåVidere(t);
        await t
            .expect(Selector('.søknadSendt', { timeout: 20000 }).exists)
            .eql(true);
    }
);

test.before(async t => setParent(t, config.fnr_default_mor))(
    'Adopsjon utenlands',
    async t => {
        await startAndResetSøknad(t, 0);
        await velkommenPage.startFørstegangssøknad(t);
        await inngangPage.adopsjonMor(t);
        await TestUtils.gåVidere(t);
        await relasjonTilBarnPage.fødtBarnAdopsjon(t);
    }
);

// test('Adopsjon singletest', async t => {
//     await t.navigateTo('http://localhost:8080/soknad/relasjon-til-barn-adopsjon');
//     await relasjonTilBarnPage.fødtBarnAdopsjon(t);
// });

// test('Frilans', async (t) => {
//     await t.navigateTo('http://localhost:8080/soknad/andre-inntekter');
//     const frilansBolk = new FrilandsBolk();
//     await frilansBolk.fyllUtHarJobbetFrilans(t);
// });

// test('SelvstendigNæringsdrivende', async (t) => {
//     await t.navigateTo('http://localhost:8080/soknad/andre-inntekter');
//     const bolk = new SelvstendigNæringsdrivendeBolk();
//     await bolk.fyllUtNorskregistrert(t);
// });

// test('AndreInntekter', async t => {
//     await t.navigateTo('http://localhost:8080/soknad/andre-inntekter');
//     const bolk = new AndreInntekterBolk();
//     await bolk.fyllUtJobbIUtlandet(t);
// });

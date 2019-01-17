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

const inngangPage = new InngangPage();
const velkommenPage = new VelkommenPage();
const relasjonTilBarnPage = new RelasjonTilBarnPage();
const annenForelderPage = new AnnenForelderPage();
const uttaksplanSkjemaPage = new UttaksplanSkjemaPage();
const uttaksplanPage = new UttaksplanPage();
const utenlandsoppholdPage = new UtenlandsoppholdPage();
const arbeidOgInntektPage = new ArbeidsforholdOgInntektPage();
const oppsummeringPage = new OppsummeringPage();

fixture(`Standardsøknader`);

test.before(async (t) => TestUtils.setParent(t, config.fnr_default_mor))('Reset søknad', async (t) => {
    await TestUtils.startAndResetSøknad(t, 0);
    await t.expect(velkommenPage.velkommenTittel.exists).eql(true);
});

test.before(async (t) => TestUtils.setParent(t, config.fnr_default_mor))('Standardmor', async (t) => {
    await TestUtils.startAndResetSøknad(t, 0);
    await velkommenPage.startFørstegangssøknad(t);
    await inngangPage.fødselMor(t);
    await TestUtils.gåVidere(t);

    await relasjonTilBarnPage.velgBarnetErFødt(t, false);
    await relasjonTilBarnPage.velgAntallBarn(t, 1);
    await relasjonTilBarnPage.setTermindato(t);
    await TestUtils.gåVidere(t);

    await annenForelderPage.farMedmorDeltOmsorg(t);
    await TestUtils.gåVidere(t);

    await uttaksplanSkjemaPage.standard(t);
    await uttaksplanSkjemaPage.velgAntallUkerFelles(t, 16);
    await TestUtils.gåVidere(t);
    await TestUtils.gåVidere(t);

    await utenlandsoppholdPage.ingenUtenlandsopphold(t);
    await TestUtils.gåVidere(t);

    await arbeidOgInntektPage.standard(t);
    await TestUtils.gåVidere(t);

    await oppsummeringPage.aksepterVilkår(t);
    await TestUtils.gåVidere(t);
    await TestUtils.ventPåKvittering(t);
});

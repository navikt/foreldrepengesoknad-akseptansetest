import TestUtils from './testutils';
import LoginPage from './pages/LoginPage';
import InngangPage from './pages/InngangPage';
import VelkommenPage from './pages/VelkommenPage';
import RelasjonTilBarnFødselPage from './pages/RelasjonTilBarnFødselPage';

import { config } from '../config';

const loginPage = new LoginPage();
const inngangPage = new InngangPage();
const velkommenPage = new VelkommenPage();
const relasjonTilBarnetPage = new RelasjonTilBarnFødselPage();

fixture(`Foreldrepengesøknad`).page`https://foreldrepengesoknad-q.nav.no/velkommen`.beforeEach(async t => {
    await t.useRole(loginPage.login(config.fnr_default));
});

export const startAndResetSøknad = async (t: TestController) => {
    await TestUtils.waitForInitialDataLoaded();
    const path = await TestUtils.getPath();
    if (path !== '/velkommen') {
        await TestUtils.avbrytSøknad(t);
    }
};

test('Fyller ut søknad som mor', async t => {
    await t.navigateTo(config.url);
    await startAndResetSøknad(t);
    await velkommenPage.start(t);
    await inngangPage.fødselMor(t);
    await relasjonTilBarnetPage.caseFødtBarn(t);
});

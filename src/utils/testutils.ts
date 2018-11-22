import { Selector, ClientFunction } from 'testcafe';
import * as moment from 'moment';
import StegSelectors from './stegSelectors';

const waitForInitialDataLoaded = ClientFunction(() => {
    return new Promise(resolve => {
        window.setInterval(() => {
            if (document.location.pathname !== '/') {
                resolve();
            }
        }, 100);
    });
});

const getPath = ClientFunction(() => document.location.pathname);

const getHost = ClientFunction(() => document.location.host);

const avbrytSøknad = async (t: TestController) => {
    await t.click(StegSelectors.avbrytSøknadLenke);
    await Selector('.bekreftDialog__bekreftKnapp');
    await t.click('.bekreftDialog__bekreftKnapp');
    await t.expect(getPath()).eql('/velkommen');
};

const selectRadioVerdi = async (t: TestController, radiogruppe: Selector, verdi: string) => {
    const radio = radiogruppe.find(`input[value="${verdi}"]`);
    await t.expect(radio.count).eql(1);
    await t.click(radio);
};

const selectRadio = async (t: TestController, name: string, value: string | number) => {
    await t.click(StegSelectors.radioPanelElement(name, value));
};

const setDato = async (t: TestController, input: Selector, dato: Date) => {
    await t.typeText(input, moment(dato).format('DD.MM.YYYY')).pressKey('tab');
};

const fortsett = async (t: TestController) => {
    await t.click(StegSelectors.fortsettKnapp);
};

const getRadioPanelGruppe = (navn: string) => {
    return StegSelectors.radioPanelGruppe(navn);
};

const TestUtils = {
    avbrytSøknad,
    getPath,
    getHost,
    getRadioPanelGruppe,
    fortsett,
    selectRadioVerdi,
    selectRadio,
    setDato,
    waitForInitialDataLoaded
};

export default TestUtils;

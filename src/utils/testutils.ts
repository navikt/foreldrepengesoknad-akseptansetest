import { Selector, ClientFunction } from 'testcafe';
import * as moment from 'moment';

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

const avbrytSøknad = async (t: TestController) => {
    await t.click('.stegFooter button');
    await Selector('.bekreftDialog__bekreftKnapp');
    await t.click('.bekreftDialog__bekreftKnapp');
    await t.expect(getPath()).eql('/velkommen');
};

const selectRadioVerdi = async (t: TestController, selector: Selector, verdi: string) => {
    const key = `input[value="${verdi}"]`;
    const radio = selector.find(`input[value="${verdi}"]`);
    await t.expect(radio.count).eql(1);
    await t.click(radio);
    return t;
};

const selectRadio = async (t: TestController, name: string, value: string) => {
    await t.click(`input[name="${name}"][value="${value}"]`);
};

const setDato = async (t: TestController, input: Selector, dato: Date) => {
    await t.typeText(input, moment(dato).format('DD.MM.YYYY')).pressKey('tab');
    return t;
};

const fortsett = async (t: TestController) => {
    await t.click(`.fortsettKnapp`);
    return t;
};

const getRadioPanelGruppe = (navn: string) => {
    return Selector(`input[name="${navn}"]`).parent('.radioPanelGruppe');
};

const TestUtils = {
    waitForInitialDataLoaded,
    getPath,
    selectRadioVerdi,
    selectRadio,
    setDato,
    avbrytSøknad,
    getRadioPanelGruppe,
    fortsett
};

export default TestUtils;

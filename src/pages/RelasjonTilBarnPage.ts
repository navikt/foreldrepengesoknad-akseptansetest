import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import StegSelectors from '../utils/stegSelectors';
import * as moment from 'moment';
import SelvstendigNæringsdrivendeBolk from '../modules/SelvstendigN\u00E6ringsdrivendeBolk';

export default class RelasjonTilBarnPage {
    adopsjon: {
        gjelderStebarnsadopsjonNei: Selector;
        adopsjonsdato: Selector;
        adoptertIUtlandetJa: Selector;
        adoptertIUtlandetNei: Selector;
        ankomstdato: Selector;
        fødselsdatoerFlere0: Selector;
        feilAnkomstdato: Selector;
    };
    erBarnetFødt: Selector;
    antallBarn: Selector;
    antallBarnSelect: Selector;
    fødselsdato: Selector;
    termindato: Selector;
    ettBarn: Selector;

    constructor() {
        this.erBarnetFødt = TestUtils.getRadioPanelGruppe('barnFødt');
        this.antallBarn = TestUtils.getRadioPanelGruppe('antallBarn');
        this.antallBarnSelect = Selector('select[name="antallBarnSelect"]');
        this.fødselsdato = Selector('#fødselsdato');
        this.termindato = Selector('input[name="termindato"]');

        this.ettBarn = StegSelectors.radioPanelElement('antallBarn', '1');

        this.adopsjon = {
            fødselsdatoerFlere0: Selector('input[name="fødselsdatoer.flere.0"]'),
            gjelderStebarnsadopsjonNei: StegSelectors.radioPanelElement(
                'adopsjonAvEktefellesBarn',
                'nei'
            ),
            adopsjonsdato: Selector('#adopsjonsdato'),
            adoptertIUtlandetJa: StegSelectors.radioPanelElement('adoptertIUtlandet', 'ja'),
            adoptertIUtlandetNei: StegSelectors.radioPanelElement('adoptertIUtlandet', 'Nei'),
            ankomstdato: Selector('#ankomstdato'),
            feilAnkomstdato: Selector('.feil-oppsummering-boks a[href="#ankomstdato"]'),
        };
    }

    async velgBarnetErFødt(t: TestController, født: boolean) {
        await TestUtils.selectRadioVerdi(t, this.erBarnetFødt, født ? 'ja' : 'nei');
    }

    async velgAntallBarn(t: TestController, antall: number = 1) {
        if (antall <= 3) {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, `${antall}`);
        } else {
            await TestUtils.selectRadioVerdi(t, this.antallBarn, '3');
            await t.click(this.antallBarnSelect);
            await t.click(this.antallBarnSelect.find(`option[value="${antall}"]`));
        }
    }

    async setFødselsdato(t: TestController, dato?: Date) {
        await TestUtils.setDato(t, this.fødselsdato, dato || new Date());
    }

    async setTermindato(t: TestController, dato?: Date) {
        await TestUtils.setDato(t, this.termindato, dato || new Date());
    }

    async fødtBarn(t: TestController) {
        await t.expect(StegSelectors.fortsettKnapp.exists).notOk();

        await this.velgBarnetErFødt(t, true);
        await this.velgAntallBarn(t, 1);
        await this.setFødselsdato(t, new Date());

        await t.expect(StegSelectors.fortsettKnapp.hasAttribute('disabled')).notOk();
    }

    async fødtBarnAdopsjon(t: TestController) {
        const fødselsdato = new Date();
        const adopsjonsdato = moment(fødselsdato)
            .add(1, 'day')
            .toDate();

        const ankomstdatoBeforeFødselsdato = moment(fødselsdato)
            .subtract(1, 'day')
            .toDate();

        const ankomstdatoAfterFødselsdato = moment(fødselsdato)
            .add(1, 'day')
            .toDate();

        const { adopsjon } = this;
        await t
            .click(adopsjon.gjelderStebarnsadopsjonNei)
            .typeText(adopsjon.adopsjonsdato, TestUtils.dateToString(adopsjonsdato))
            .pressKey('tab')
            .click(this.ettBarn)
            .typeText(adopsjon.fødselsdatoerFlere0, TestUtils.dateToString(fødselsdato))
            .pressKey('tab')
            .click(adopsjon.adoptertIUtlandetJa)
            .typeText(adopsjon.ankomstdato, TestUtils.dateToString(ankomstdatoBeforeFødselsdato))
            .pressKey('tab');

        await TestUtils.gåVidere(t);

        await t.expect(adopsjon.feilAnkomstdato.exists).ok();

        await t
            .typeText(adopsjon.ankomstdato, TestUtils.dateToString(ankomstdatoAfterFødselsdato))
            .pressKey('tab');
    }
}

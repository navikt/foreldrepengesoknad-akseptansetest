import * as moment from 'moment';
import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';

class Uttaksplan {
    openNyPeriodeForm: Selector;
    fomInput: Selector;
    tomInput: Selector;
    kvote: Selector;
    samtidigUttak: Selector;
    gradertUttak: Selector;
    leggTilPeriodeKnapp: Selector;

    constructor() {
        this.openNyPeriodeForm = Selector(
            'button[data-name="openNyPeriodeForm"]'
        );
        this.leggTilPeriodeKnapp = Selector(
            'button[data-name="leggTilPeriode"]'
        );
        this.fomInput = Selector('input[name="fraDatoInput"]');
        this.tomInput = Selector('input[name="tilDatoInput"]');
        this.kvote = TestUtils.getRadioPanelGruppe('kvote');
        this.samtidigUttak = TestUtils.getRadioPanelGruppe('samtidigUttak');
        this.gradertUttak = TestUtils.getRadioPanelGruppe(
            'ønskerDuGradertUttak'
        );
    }

    async selectKvote(t: TestController, kvote: string) {
        await TestUtils.selectRadioVerdi(t, this.kvote, kvote);
    }

    async selectSamtidigUttak(t: TestController, samtidigUttak: string) {
        await TestUtils.selectRadioVerdi(t, this.samtidigUttak, samtidigUttak);
    }

    async selectGradering(t: TestController, gradering: string) {
        await TestUtils.selectRadioVerdi(t, this.gradertUttak, gradering);
    }

    async leggTilPeriode(t: TestController) {
        const fødselsdato: Date = new Date();
        let førsteUttaksDato: Date = moment(fødselsdato)
            .add(2, 'months')
            .toDate();
        let sisteUttaksDato: Date = moment(førsteUttaksDato)
            .add(2, 'months')
            .toDate();

        if (
            moment(førsteUttaksDato).isoWeekday() === 6 ||
            moment(førsteUttaksDato).isoWeekday() === 7
        ) {
            førsteUttaksDato = moment(førsteUttaksDato)
                .add(2, 'days')
                .toDate();
        }

        if (
            moment(sisteUttaksDato).isoWeekday() === 6 ||
            moment(sisteUttaksDato).isoWeekday() === 7
        ) {
            sisteUttaksDato = moment(sisteUttaksDato)
                .add(2, 'days')
                .toDate();
        }

        await t
            .click(this.openNyPeriodeForm)
            .typeText(this.fomInput, TestUtils.dateToString(førsteUttaksDato))
            .pressKey('tab')
            .typeText(this.tomInput, TestUtils.dateToString(sisteUttaksDato))
            .pressKey('tab');
        await this.selectKvote(t, 'FEDREKVOTE');
        await this.selectSamtidigUttak(t, 'nei');
        await this.selectGradering(t, 'nei');
        await t.click(this.leggTilPeriodeKnapp);
    }
}

export default Uttaksplan;

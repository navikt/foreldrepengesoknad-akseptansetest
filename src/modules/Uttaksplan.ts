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
    aktivitetskravInput: Selector;
    leggTilPeriodeKnapp: Selector;

    constructor() {
        this.openNyPeriodeForm = Selector('button[data-name="openNyPeriodeForm"]');
        this.leggTilPeriodeKnapp = Selector('button[data-name="leggTilPeriode"]');
        this.fomInput = Selector('input[name="fraDatoInput"]');
        this.tomInput = Selector('input[name="tilDatoInput"]');
        this.kvote = TestUtils.getRadioPanelGruppe('kvote');
        this.samtidigUttak = TestUtils.getRadioPanelGruppe('samtidigUttak');
        this.aktivitetskravInput = Selector('select[name="hvaSkalMorGjøre.spørsmål"]');
        this.gradertUttak = TestUtils.getRadioPanelGruppe('ønskerDuGradertUttak');
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

    async selectAkvititetskrav(t: TestController, aktivitet: string) {
        await TestUtils.selectDropdown(t, this.aktivitetskravInput, aktivitet);
    }

    async leggInnAntallUker(t: TestController, antallUker: number, startDato: Date = new Date()) {
        const førsteUttaksDato: Date = TestUtils.skipWeekend(startDato);
        const sisteUttaksDato: Date = TestUtils.rewindToBeforeWeekend(
            moment(førsteUttaksDato)
                .add(antallUker, 'weeks')
                .subtract(1, 'day')
                .toDate()
        );

        await this.skrivInnDatoer(t, førsteUttaksDato, sisteUttaksDato);
    }

    async leggTilUkerPåFar(t: TestController, antallUker: number, startDato: Date = new Date()) {
        const førsteUttaksDato: Date = TestUtils.skipWeekend(startDato);
        const sisteUttaksDato: Date = TestUtils.rewindToBeforeWeekend(
            moment(førsteUttaksDato)
                .add(antallUker, 'weeks')
                .subtract(1, 'day')
                .toDate()
        );

        await t.click(this.openNyPeriodeForm);
        await this.skrivInnDatoer(t, førsteUttaksDato, sisteUttaksDato);
        await this.selectKvote(t, 'FEDREKVOTE');
        await this.selectSamtidigUttak(t, 'nei');
        await this.selectGradering(t, 'nei');
        await t.click(this.leggTilPeriodeKnapp);
    }

    async skrivInnDatoer(t: TestController, førsteUttaksdato: Date, sisteUttaksdato: Date) {
        await t
            .typeText(this.fomInput, TestUtils.dateToString(førsteUttaksdato))
            .pressKey('tab')
            .typeText(this.tomInput, TestUtils.dateToString(sisteUttaksdato))
            .pressKey('tab');
    }

    async leggTilPeriodeForFar(t: TestController) {
        const fødselsdato: Date = new Date();
        let førsteUttaksDato: Date = moment(fødselsdato)
            .add(2, 'months')
            .toDate();
        let sisteUttaksDato: Date = moment(førsteUttaksDato)
            .add(2, 'months')
            .toDate();

        førsteUttaksDato = TestUtils.skipWeekend(førsteUttaksDato);
        sisteUttaksDato = TestUtils.skipWeekend(sisteUttaksDato);

        await t.click(this.openNyPeriodeForm);
        await this.skrivInnDatoer(t, førsteUttaksDato, sisteUttaksDato);
        await this.selectKvote(t, 'FEDREKVOTE');
        await this.selectSamtidigUttak(t, 'nei');
        await this.selectGradering(t, 'nei');
        await t.click(this.leggTilPeriodeKnapp);
    }
}

export default Uttaksplan;

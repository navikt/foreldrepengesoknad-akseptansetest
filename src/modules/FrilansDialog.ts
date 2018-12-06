import * as moment from 'moment';
import { Selector } from 'testcafe';
import TestUtils from '../utils/testutils';
import StegSelectors from '../utils/stegSelectors';

class FrilandsOppdragDialog {
    dialog: Selector;
    navnArbeidsgiver: Selector;
    fom: Selector;
    tom: Selector;
    pågåendeCheck: Selector;
    leggTilBt: Selector;
    avbrytBt: Selector;

    constructor() {
        this.dialog = Selector('.frilansOppdragModal');
        this.navnArbeidsgiver = this.dialog.find('input[name="oppdragsgiverNavn"]');
        this.fom = this.dialog.find('input[name="fraDatoInput"]');
        this.tom = this.dialog.find('input[name="tilDatoInput"]');
        this.pågåendeCheck = this.dialog.find('input[name="pågåendeOppdrag"]');
        this.avbrytBt = this.dialog.find('button[data-name="avbryt"]');
        this.leggTilBt = this.dialog.find('button[data-name="leggTil"]');
    }

    async fyllUt(t: TestController, arbeidsgiver: string, fom: Date, tom: Date) {
        await t.typeText(this.navnArbeidsgiver, arbeidsgiver);
        await TestUtils.setDato(t, this.fom, fom);
        await TestUtils.setDato(t, this.tom, tom);
        await t.click(this.leggTilBt);
    }
}

export default FrilandsOppdragDialog;

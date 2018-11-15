import TestUtils from '../utils/testutils';
import { Selector } from 'testcafe';
import { config } from '../../config';

export default class AnnenForelderPage {
    fornavnInput;
    etternavnInput;
    kanIkkOppgisCb;
    fødselsnummerInput;
    utenlandskFødselsnummerCb;
    landSelect;

    constructor() {
        this.fornavnInput = Selector('input[name="fornavn"]');
        this.etternavnInput = Selector('input[name="etternavn"]');
        this.kanIkkOppgisCb = Selector('input[name="annenForelderKanIkkeOppgis"]');
        this.fødselsnummerInput = Selector('input[name="fødselsnummer"]');
        this.utenlandskFødselsnummerCb = Selector('input[name="harUtenlandskFnr"]');
        this.landSelect = Selector('select[name="land"]');
    }

    async farMedmorDeltOmsorg(t) {
        await t
            .typeText(this.fornavnInput, 'Henriette')
            .typeText(this.etternavnInput, 'Ibsen')
            .typeText(this.fødselsnummerInput, config.fnr_annenForelderKvinne || '12109849462');
        await TestUtils.selectRadio(t, 'omsorgsfordeling', 'nei');
        await TestUtils.selectRadio(t, 'annenForelderRettPåForeldrepenger', 'ja');
        await TestUtils.selectRadio(t, 'erAnnenForelderInformert', 'ja');
        await TestUtils.fortsett(t);
    }
}

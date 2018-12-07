import StegSelectors from '../utils/stegSelectors';
import { Selector } from 'testcafe';
import SelvstendigNæringsdrivendeDialog from './SelvstendigN\u00E6ringsdrivendeDialog';

class SelvstendigNæringsdrivendeBolk {
    harJobbetJaRb: Selector;
    harJobbetNeiRb: Selector;
    leggTilBt: Selector;

    constructor() {
        this.harJobbetJaRb = StegSelectors.radioPanelElement('harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', 'ja');
        this.harJobbetNeiRb = StegSelectors.radioPanelElement('harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', 'ja');
        this.leggTilBt = Selector('button[data-name="leggTilNæring"]');
    }

    async fyllUtNorskregistrert(t: TestController) {
        const dialog = new SelvstendigNæringsdrivendeDialog();
        await t.click(this.harJobbetJaRb).click(this.leggTilBt);
        await dialog.fyllUt(t);
    }
}

export default SelvstendigNæringsdrivendeBolk;

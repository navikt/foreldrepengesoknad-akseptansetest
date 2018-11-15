import { Selector } from 'testcafe';

const fortsettKnapp = Selector('.steg .fortsettKnapp');
const avbrytSøknadLenke = Selector('#avbrytSøknadLenke');
const radioPanelGruppe = name => Selector(`input[name="${name}"]`).parent('.radioPanelGruppe');
const radioPanelElement = (name, value) => Selector(`input[name="${name}"][value="${value}"]`);

const StegSelectors = {
    fortsettKnapp,
    avbrytSøknadLenke,
    radioPanelGruppe,
    radioPanelElement
};

export default StegSelectors;

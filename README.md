# Akseptansetester for søknad om engangsstønad

Brukes for å oppdage regresjon og avgjøre om løsningen kan deployes til produksjon.

# Komme i gang

For å kjøre testene:

1. Lag en fil `config.js` (gjøres automatisk på CI-serveren, pass på å ikke sjekke den inn):
```javascript
export const config = {
    "login_url": "https://adresse/til/loginservice?redirect=........",
    "url": "https://adresse/til/app",
    "user": "brukeren",
    "pass": "passordet",
    "fnr_default": "12345678910",
    "fnr_under_18": "12345678911",
    "fnr_ikkenordisk_eøs": "12345678912",
    "fnr_mann_norsk": "12345678913",
    "fnr_nordisk_eøs": "12345678914",
    "fnr_barn_tps": "12345678915",
    "fnr_mann": "12345678916"
}
```
2. `npm install`
3. `npm test`

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til nav.team.bris@nav.no.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #bris.

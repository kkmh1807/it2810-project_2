# Context API

Appen er pakken inn i en kontekst som tar vare på prosjekt og api-nøkkel etter at brukeren har fylt inn informasjonen. Dette gir oss en overordnet lagringsplass for denne informasjonen, slik at de komponentene som har behov for det kan hente dataen fra hvor som helst i applikasjonen.

# HTML Web Storage

## LocalStorage

LocalStorage brukes for å lagre filtreringsalternativer til de ulike sidene. Dette er informasjon som er nyttig å lagre mellom sesjoner, og siden dette ikke er sensitiv informasjon er det greit å lagre den uten levetid.

## Session

Session storage er brukt for å lagre API konfigurasjonen fra konteksen. Det gjør det mulig å oppdatere (refreshe) nettisden uten at dataen blir borte, samtidig som sensitiv informasjon slik som api nøkkel ikke lagres over lengre tid.

Man kunne dermed benyttet seg av kontekst på en annen måte enn å lagre dataen dobbelt opp, for eksempel mørk modus for applikasjonen. Løsningen ville da ha vært annerledes. Man kunne lagret inputet direkte fra bruker i session storage og komponentene måtte ha hentet opp den lagrede dataen hver gang. Vi føler likevel at det var enklest å bruke context APIet på valgt måte som en slags mellomlagring av den nødvendige dataen.

# Ajax

For å hente data til applikasjonen valgte vi å bruke den innebygde `fetch` metoden i JavaScript. Mens den er relativt enkel, tilbyr tredjeparts biblioteker slik som Axios ekstra funksjonalitet slik som avbryting og avskjæring av forespørsler. Vi mener denne appen ikke er så komplisert at det er behov for slike ting, og vi mener derfor at `fetch` er tilstrekkelig

# Komponenter

Vi har i hovedsak fokusert på funksjonelle komponenter og pilfunksjon komponenter. Pilfunksjon komponenter gjør det enklere å sette på typer. I henhold til kravene har vi implementert Selectorkomponenten som en klassebasert komponent.

# Filstruktur

Vi har valgt en standard filstruktur som skiller sider (pages), sideelementer (komponenter), stiler, hjelpemetoder,ressurser (assets), hooks, types og context.

# Elementer

## Viewport

Viewport meta tagen er inkludert som standard via `create-react-app`. I tillegg har vi enkelte steder brukt `vh` og `vw` enhetene i css for å tilpasse størrelsen på elementer etter skjermen

## Media Queries

Media queries er tatt i bruk for å gjøre nettsiden responsiv, og er brukt overalt hvor størrelse-spesifikk styling er nødvendig. Siden har to forskjellige breakpoints; 320px for mobil og 768px for nettbrett.

## Skalerende bilde

Vi har et generisk bilde som skal representere en gruppe som jobber flittig med et prosjekt på gitlab. Bilde skaleres med størrelsen på siden, og har en minimums bredde på 300px.

## Fleksibel layout

Vi brukte i hovedsak flexbox da dette enkelt ga oss et fint og flytende layout på siden. På noen av sideelementene var det hensiktsmessig å bruke css-grid. Vi brukte grid på overview siden, for kakediagrammet og på sidene som viser issues og merge-requests. Vi valgte å bruke grid for å enkelt kunne plassere de ulike elementene i kolonner så vi kunne unngå at side-elementene fløt om hverandre.

# Testing

React testing library er brukt til å teste enkeltkomponenter som Selector og InputField. Vi rendrer komponentene med test verdier og sjekker at komponenten ser ut og fungerer som tenkt.

Vi har gjennomført testing på mindre skjermer både gjennom utviklerverktøyet til Chrome og på våre egne mobile enheter. Vi har testet på iPad air med 10,9 tommer skjerm, Huawei p20 pro med 6,1 tommer og Samsung S21 med 6,2 tommer.

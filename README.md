
#Digdir-camp-oppgåve om eigenkontrollert identitet og digital lommebok


## Motivasjon

Egen-kontrollert identitet (selv-sovereign identity, SSI) er en motreaksjon til store platformer (som facebook, twitter, ...) som samler inn masse data om oss, data som vi ikke har kontroll over hvordan blir brukt.

Grunntanken bak SSI er at brukeren selv skal ha kontroll på sin identitet og sine data.  SSI er altså et **tankesett**, en samfunnstrend, og ikke en teknisk løsning.  

For **kontroll på egen identitet** ser SSI-tilhengere for seg at istedet for “log in med facebook”, så skal brukeren ha en digital “lommebok”,  der en kan opprette en drøss med “sub-identiteter”, hver til sitt bruk, feks. en id for å logge inn på facebook, en annen mot twitter, en tredje mot offentlig sektor, egne id'er for hver nettbutikk, etc.

For **kontroll med egne data** ser man videre for seg å putte "bevis" inn i lommeboka. Bevis blir utstedt av ulike utstedere. For eksempel kan et universitet utstede et vitnemål til lommeboka til en student.    Brukeren  bestemmer selv, ved hjelp av lommeboka, hvis og når beviset skal deles med andre aktører.

Vi trur at W3C-standarden **Verifiable Credentials** er vesentleg for å kunne realisere SSI.  I denne inngår følgjande aktørar:

![image](vc.png)

* **Issuer** - utsteder av bevis
* **Holder** - slutt-bruker med ei digital lommebok
* **Verifier** - den som har behov for å sjå eit bevis
* **Verifiable Data Registry** - tillitsrammeverk, "noe" der de tre andre aktørene finne ut om og i hvilken grad de kan stole på hverandre.

## Oppgåve

Oppgåva er i stort å utforske økosystemet som SSI tilbyr, finne ut kor modent ulike deler av det er, og kome med anbefalingar på kva Digdir generelt, og ID-porten spesielt, bør gjere på dette feltet vidare.


Primært tenkjer me at oppgåva vert løyst i form av utvikling av ein teknisk proof-of-concept, samt dokumentasjon av funn og anbefalingar.

Ein PoC bør ta utgangspunkt i eit konkret use-case for å demonstrere heile verdikjeda kring eigenkontrollert identitet. dvs. frå utstedelse av bevis, lagring i lommeboka, til bruker-kontroller utlevering av beviset opp mot ei digital teneste.  Mogelege kandidatar for use-case kan vere:


1. Ein kommune utsteder kortlevde bevis på at "lommebok-innehaver er sjukepleier i Sogndal kommune", som Folkehelseinstituttet (FHI) kan stole på til å utlevere data om pasienter.

2. Alderskontroll: Folkeregisteret utsteder bevis på at bruker er myndig og beviset kan verifiserast av Vinmonopolet til å la brukar kjøpe øl / sprit.

3. Bevis på norsk statsborgerskap (KVA ER TENESTA?)

4. Brønnøysundregistrene utsteder bevis for at brukeren er styrleder for et selskap (KVA ER TENESTA?)

5. ?


Spørsmål som Digdir er interessert i å få svar på gjennom arbeidet:

1. Korleis kan vi utstede ein VC?
2. Kva VC kan det vere aktuelt at Digdir utsteder?
2. Kva lommebøker finst, og korleis kan vi stole på at innbyggeren har valgt ei "trygg" lommebok ?
4. Korleis utvekslar vi data via ei lommebok i praksis ?  
5. Kor lett er det for virksomheiter å ta i bruk VC?



### Mogeleg strukturering av arbeidet:

Her er EIT framlegg til korleis strukturere arbeidet. Men viktig at gruppa sjølv bestemmer korleis dei best ser for seg å svare ut problemstillinga.

#### Arkitekturvalg og anbefalinger

Ta frem systemarkitekturen, belyse viktige vegvalg - hvilke alternativer finnes og hva er pro/con ved ulike valg ?  
Oppsummere funn og anbefalingar

Typisk vil dette vere eit levande dokument som vert ferdigstilt iterativt etter kvart som prosjektet går framover.


Framlegg til aspekt som kan inkluderast:

- sette seg inn i SSI-økosystemet, aktuelle trender, initativ med momentum, forkasta spor, dead-ends.
- sjølve lommeboka: lage sjølv frå scratch, finne ei ferdig lommebok,  eller basere seg på eit rammeverk ?
- kva skal vere "tillitsrammeverket"? (verifiable data registory).  en sky-database,  en blokk-kjede,  x.509-sertifater
- Må vi bruke DIDs?  Kva er alternativa?
- Treng ein zero knowledge proofs?
- Kva skal til for å eit reelt økosystem basert på ssi, korleis oppnå høg bruk,  kven tener penger og korleis, kva er det offentlege si rolle ovanfor SSI, korleis få andre enn personvern-entusiastar til å ta det i bruk?

I tilegg bør ein dokumentere og evt. drøfta erfaringar ein gjer seg gjennom dei neste del-oppgåvene:

#### A: Utsteder-rollen

**Utsteder av "grunnidentitet"**

Lag ein applikasjon som "onboarder" brukaren til lommeboka ved at applikasjonen utsteder eit identitetsbevis i form av VC. Identiteten vert henta gjenneom ei innlogging i ID-porten med eksisterande eID (MinID, BankID, ...).  


Korleis vi usteder stole på at innbyggeren har valgt ei lommebok som er trygg&sikker?

**Utsteder av bevis**

Lag ein variant av applikasjonen over, som lagar bevis (t.d. "er-sjukepleiar", "er-over-18-år") i form av VC knytt til grunnidentitet.  Viktig at dette IKKJE skjer via ID-porten, men direkte mellom applikasjon og lommeboka, der denne må bevise kryptografisk at den har kontroll på privatnøkkelen tilknytta identitet.

#### B: Lommeboka

Lage ei lommebok (primært iOS-app) med VC-støtte.
Lommeboka må stole på tillitsrammeverket, slik at berre VC laga av godkjende Issuere blir akseptert lagra.
Bruke må kunne svar på forspørsler frå nettleser om å få tilgang til bevis.
Vise bevis som QR-koder slik at Verifier-app'er kan initiere kommunikasjon ved å scanne dei.

Vurdere ulike modeller for teneste-lommebok-kommunikasjon (pull: tenesta ber om bevis av viss type, som brukeren akspeterer blir utlevert. push: brukeren initierer samhandlinga frå lommeboka).


#### C: Tillitsrammeverket

Lag ei løysing for "Verifiable Data Registry". Her skal lommeboka (Holder) og tenester (Verifier) kunne slå opp for å finne publicnøkkelen til godkjende utstedere.
Vurdere korleis ein kan definiere skjema for bevis ("hvordan ser et vitnemål ut?")

#### D: Tenesta
Lag ei nett-teneste som krev at brukaren har eit  bevis av ein gitt type.  
Skal berre akseptere bevis frå utstedere som har lov til å laga denne typen bevis, ihht. tillitsrammeverket.
Skal bruke VC-standarden direkte mot lommeboka.

**Lommebok som distribuert eID**
Dette er den enklaste varianten av C, der vi vil bruke grunnidentiteten i lommeboka som ein "rein" påloggingsmekanisme til ei teneste. Tenesta treng berre vite fødselsnummer til brukaren, frå identitetsbeviset.

#### E: Lommebok via OIDC
Det vil vere mange eksisterende tenester som brukar ID-porten idag som ikkje er organisasjonsmessig eller teknisk i stand til å ta i bruk VC direkte.

Istaden for direkte kommunikasjon mellom lommebok og tjeneste, så vil desse ønskje at ID-porten tilbyr lommeboka som ein ny påloggingsmekanisme i tillegg til BankID, Buypass, Commfides.... Då får tenesta  fødselsnummeret i id_tokenet på vanleg måte.

**VC over OIDC**
Dette er ein utvidelse av E, der ID-porten viderformidler heile/deler av beviset frå lommeboka til tjenesten.

Denne oppgåva kan fort vere omfattande pga tid for å setje opp ID-porten, så passar kanskje best som ein papir-øving.




## Relevant bakgrunn

**Sylferskt:** EU vil utvikle en europeisk identitet basert på lommebok-tankegangen:   https://digital-strategy.ec.europa.eu/en/news/commission-proposes-trusted-and-secure-digital-identity-all-europeans

Norsk initiativ: https://www.din.foundation/

Stor internasjonal aktør: https://identity.foundation/

I tillegg er det eit lass med andre aktører, derav  mange som skal "gjere noko med blokkjede eller kryptovaluta..."


## Spesifikasjoner
https://en.wikipedia.org/wiki/Self-sovereign_identity

https://en.wikipedia.org/wiki/Decentralized_identifiers

https://www.w3.org/TR/vc-data-model/

https://www.w3.org/TR/did-core/Overview.html

Merk at DID'er og VC'er ikkje er det same, at det KAN brukast saman, men ein kan fint bruke dei kvar for seg.

Merk også at det ser ut til å vere ulike VC-varianter, ref. paperet til CCI: https://www.lfph.io/wp-content/uploads/2021/02/Verifiable-Credentials-Flavors-Explained.pdf

#### Tekniske lenker, implementasjoner

Microsoft Azure AD-basert VC,  denne er aktuell spesielt for kommune-basert utstedere sidan "alle" har sine tilsette i AD allereie.
https://docs.microsoft.com/en-us/azure/active-directory/verifiable-credentials/decentralized-identifier-overview

https://www.youtube.com/watch?v=62IYP1XtTYU
kan merke oss at denne aktøren bruker *ikkje* DIDs og/eller blokkkjeder, men heller tradisjonell TLS med PKI til å etablere tillit mellom issuer og verifier.


https://dwhuseby.medium.com/dont-use-dids-58759823378c   argumenterer sterkt for at DIDs ikkje har noko interoperabel framtid, fordi det finst 96 forskjellige DID-metodar...

Korleis bruke VC saman med OpenID Connect:
https://medium.com/decentralized-identity/where-to-begin-with-oidc-and-siop-7dd186c89796

alternativ?
https://www.slideshare.net/TorstenLodderstedt/openid-connect-for-w3c-verifiable-credential-objects


Dersom ein VERKELEG vil gå djupt, sjå proceedings frå førre Internet Identity Workshop: https://github.com/windley/IIW_homepage/raw/gh-pages/assets/proceedings/IIW_32_Book_of_Proceedings_Final%20A%201.pdf

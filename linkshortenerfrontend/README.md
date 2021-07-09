# Linkshortener Frontend
### [readme.md](https://pbs.twimg.com/media/E4crkNtXoAckZU1?format=jpg&name=medium)

## Umfang / Features

- Oberfläche um eine URL zu kürzen, entweder automatisch, oder mit manueller Wahl der Abkürzung (*UrlShortener.vue*)
- Oberfläche um den verkürtzen Link aufzulösen + Weiterleitung zur Original URL (*router.vue*, **/link/:id**) 
- Admin-Ansicht für den Link-Ersteller (*adminLink.vue*, **/admin/:adminCode**)
- Admin Dashboard zur Übersicht aller generierten Links und deren Aufrufzahl, User-IP & Abkürzungen (*adminDashboard.vue*, **/adminDashboard**)

## Struktur der einzelnen Komponenten 

### UrlShortener.vue
<img src="https://i.ibb.co/j4bJtqd/expo.png"/>

#### Wichtige Variablen der Komponente: 
 - **inputUrl**: Texteingabe der zu verkürzenden URL 
 - **generatedUrl**: Input Feld, disabled, hier wird die generierte Abkürzung ausgegeben
<img src="https://i.ibb.co/28KjrwH/Bild-2021-07-09-134407.png"/>

#### Wichtige Funktioner der Komponente: 
- **async getGeneratedAbbrevation(inputUrl)**: Nimmt die eingegebene Url entgegen und sendet diese zusammen mit der Client IP Adresse & den generierten adminLik an das Backend.
- **copyFromOutputField()**: kopiert den aktuellen Wert von generatedUrl in die Zwischenablage
- **switchToEdit()**: wechselt in den editieren Modus, um die Emojis für die Abkürzung selbst zu wählen.
<img src="https://i.ibb.co/znXh467/Bild-2021-07-09-134934.png"/>

### router.vue
<img src="https://i.ibb.co/N1Ng51R/routerE.png"/>

#### Wichtige Variablen der Komponente: 
 - **originalLink**: Variable der Url, zu der weitergeleitet wird
 - **clickCounter**: die Aufrufanzahl, wie oft dieser Link bereits aufgerufen wurde

#### Wichtige Funktioner der Komponente: 
- **mounted()**: Schickt eine Backend-Anfrage für die gegebene Abkürzung und setzt die **originalLink** & **clickCounter** Variable. Nach 5 Sekunden wird der User durch *window.location.href* weitergeleitet


### adminLink.vue
<img src="https://i.ibb.co/ngVmWPs/admin-Oage-Ed.png"/>

#### Wichtige Variablen der Komponente: 
 - **originalLink**: Variable der Url, zu der weitergeleitet wird
 - **clickCounter**: die Aufrufanzahl, wie oft dieser Link bereits aufgerufen wurde
 - **abbrevation**: Abkürzung des Links. 
 - **editLink**: Diese Bool setzt den Status des Bearbeitungsfeld. Wenn der Wert *true* entspricht, lässt sich der *originalLink* bearbeiten und mit einem extra Button bestätigen und an das Backend übergeben.
<img src="https://i.ibb.co/DQ0qjYk/Bild-2021-07-09-151900.png"/>

#### Wichtige Funktioner der Komponente: 
- **mounted()**: Schickt eine Backend-Anfrage für den gegebenen Admin Lenk und setzt die **originalLink**, **clickCounter** & **abbreavtion** Variablen.
- **deleteLink()**: Sendet einen Backend Post-Request mit dem zugehörigen Admin-Link um den Eintrag zu löschen. 
- **updateLink()**: Schickt eine Backend Anfrage mit dem neuen Wert aus dem Input Feld um diesen als neuen originalLink zu setzen. 


### adminLink.vue 
<img src="https://i.ibb.co/ZdNbTqN/admin-Dashboard-Ed.png"/>

#### Wichtige Variablen der Komponente: 
 - **link.originalLink**: Variable der Url, zu der weitergeleitet wird
 - **link.abbrevation**: Abkürzung des Links. 
 - **link.clickCounter**: die Aufrufanzahl, wie oft dieser Link bereits aufgerufen wurde.
 - **link.dateCreated**: Der Zeitpunkt, zu dem der Eintrag erstellt wurde.
 - **link.adminCode**: der zugehörige Admin Code zu diesem Eintrag
 - **link.clientIpAdress**: Die IP-Adresse des Link-Erstellers
 - **linkCollection [{}]**: Array in welchem alle Link-Einträge gespeichert werden


#### Wichtige Funktioner der Komponente: 
- **mounted() / getEveryLinkInDB()**: Holt über den API-Endpoint */adminDashboard/getAllEntries* alle Einträge aus der Datenbank und schreibt diese in das linkCollection Array
- **deleteEntryByID(id)**: Nimmt den Admin Code des Eintrags entgegen um eine Backend Anfrage zu senden um diesen Eintrag zu löschen
- **convert(time)**: Nimmt einen UNIX-Timecode entgegen und konvertiert diesen in einen für Menschen lesbares Datum & Uhrzeit.

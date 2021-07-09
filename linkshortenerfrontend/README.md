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
- **mounted()**: Schickt eine Backend-Anfrage für die gegebene Abkürzung und setzt die **originalLink** Variable. Nach 5 Sekunden wird der User durch *window.location.href* weitergeleitet

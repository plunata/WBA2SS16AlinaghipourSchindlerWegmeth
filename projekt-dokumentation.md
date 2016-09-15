# WBA2 - Projekt-Dokumentation
Ein Projekt von Team 14 / NovaPixels <br><br>
Team-Mitglieder: <ul><li>Jan Wegmeth</li></ul> 

Folgende Mitglieder haben das Team vorzeitig verlassen: <ul><li>Krystian Schindler</li><li>Natalie Tork Alinaghipour</li></ul>

##Über diese Dokumentation
Diese Dokumentation behandelt das Workshop-Projekt des Moduls "Web-basierte Anwendungen 2" bei Prof. Fischer. 
Dabei wird zunächst auf die Aufgabenstellung und die Anforderungen an das Projekt eingegangen. 
Die dazugehörigen Ressourcen werden REST-konform spezifiziert und implementiert. Zudem wird sowohl die Benutzung der Anwendung, 
als auch die Struktur innerhalb des Systems mitsamt den Funktionalitäten und den Einschränkungen beschrieben. 
Im letzten Teil wird das Ergebnis in Form eines Fazits analysiert.

##Workshop-Aufgabe
Es soll ein Projekt-Thema zur Konzeption eines Verteilten Systems bestimmt werden.
*Phase 1*:  Auf Basis von node.js soll ein REST Dienstanbieter (Service) entwickelt und implementiert werden.
*Phase 2*: Mithilfe eines node.js-basierten Webservers und einer Nutzungsschnittstelle in Form eines Webbrowsers soll für die Anwendung ein Dienstnutzer ausgearbeitet werden.
Zur Abgabe des fertiggestellten Projekts soll die Open-Source-Plattform Github genutzt werden.

![alt tag](https://www.medieninformatik.th-koeln.de/wiki/images/a/a2/WBA2SoSe16Architektur.png)

##Exposé
###Problemszenario
1. Anna studiert Medieninformatik im 2. Semester. Der mathematische Teil des Studiums 
bereitet ihr allerdings Probleme und es fällt ihr schwer, sich alleine mit dem Thema auseinanderzusetzen. 
Dadurch, dass sie für die Studien-Veranstaltungen von Köln nach Gummersbach pendelt, konnte sie bisher noch keine 
Kontakte knüpfen.
<br>
<br>
**Lösungsansatz:** Bei unserem angebotenen Service hat sie die Möglichkeit, nach Lerngruppen für das gewünschte Modul 
zu suchen, mit ihnen in Kontakt zu treten und sich mit ihrer Gruppe zu organisieren. Sowohl durch persönliche Tasks, 
als auch durch Gruppen-Tasks kann sie ihre Lernziele und -erfolge im Auge behalten und so ihre Motivation steigern. 
Sie kann ihre Gruppen-Mitgliedschaft nach erfolgreichem Abschluss des Moduls beenden.
<br>
<br>
2. Thomas merkt im Laufe seines Informatik-Studiums, dass er ständig wichtige Informationen über seine Module 
verpasst. Er kennt die relevanten Internetseiten mit den aktuellen Meldungen, vergisst aber, regelmäßig nachzuschauen. 
<br>
<br>
**Lösungsansatz:** Mit unserem Service kann er die Neuigkeiten zu einzelnen Modulen erhalten, indem er 
Gruppen beitritt. So muss er sich nicht mehr über all die Seiten auf dem aktuellsten Stand halten. 
Hat er ein Modul abgeschlossen, kann er die Benachrichtigungen abbestellen.
<br>

###Konzept
Um die Anwendung nutzen zu können, muss zuerst ein Benutzer-Account erstellt werden. Dafür sind ein persönliches 
Kennwort, eine E-Mail-Adresse und weitere Pflichtangaben (s. Use Case 3) notwendig. Nach dem Log-In erscheint 
die Startseite in Form eines Dashboards. 

Es stehen folgende Funktionalitäten zur Auswahl:
-	Universitätsverwaltung
-	Fakultätsverwaltung
-	User-Registrierung
-	User-Login
-	Dashboard
-	Gruppen
-	Taskmanipulation

**Universitätsverwaltung**<br>
Es können Universitäten angelegt werden, um dazugehörige Fakultäten hinzuzufügen.

**Fakultätsverwaltung**<br>
Nachdem Universitäten angelegt wurden, können die Fakultäten der Universitäten gespeichert werden.

**Verwaltung der Studiengänge**<br>
Nachdem Fakultäten angelegt wurden, können die Studiengänge der Fakultät gespeichert werden.

**Verwaltung der Module**<br>
Nachdem Studiengänge angelegt wurden, können die Module der Studiengänge gespeichert werden.

**User-Registrierung**<br>
Durch Eingabe der persönlichen Daten kann ein neuer User sich registrieren und fortan unseren Service nutzen.

**User-Login**<br>
Sobald ein User mit seinen Nutzerdaten eingeloggt ist, kann er alle nachfolgenden Funktionalitäten nutzen.

**Dashboard:**<br>
Nach dem Login des Users wird dieser auf sein personalisiertes Dashboard weitergeleitet, welches eine Übersicht über seine (Gruppen-)Tasks darstellt.

**Thematische, modulbezogene Newsfeeds:**<br>
Mithilfe dieser Funktion hat der User die Möglichkeit, Neuigkeiten zu den Modulen zu erhalten, die er abonniert hat. 

**Gruppen:**<br>
Für jedes Modul ist es möglich, Gruppen zu bilden. Benutzer können nach den gewünschten Gruppen suchen und eine
Beitrittsanfrage senden. Jedes Gruppenmitglied kann Tasks erstellen, die zu einem bestimmten Zeitpunkt erledigt sein sollen und 
entweder als offen oder erledigt markiert werden können. 

**Tasks:**<br>
Eine Gruppe hat die Möglichkeit, Tasks zu erstellen, die Gruppenmitgliedern zugeteilt werden können. Bei der Task-Erstellung kann ein Titel, eine Task-Beschreibung und eine Deadline angegeben werden. Tasks können markiert werden, ob sie "In Arbeit" oder "Erledigt" sind.

##Use Cases
**Implementierte Use-Cases:**<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 1** | Universität erstellen | 
| Goal in Context | Erstellen einer Universität für den Webdienst |  
| Scope & Level | Universitätsverwaltung |
| Preconditions | <ul><li>Universität als Ressource noch nicht vorhanden</li><li>Nutzer befindet sich mithilfe eines internetfähigen Webbrowsers in der Webanwendung</li></ul>|
| Success End Condition | Ressource Universität wurde neu angelegt |
| Failed End Condition | Anlegen der Ressource Universität fehlgeschlagen |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer gibt<ul><li>den Namen,</li></ul>der Universität im entsprechenden Feld ein | 
|  | 2 | Benutzer aktiviert den Speichern-Button und schickt seine Daten an die Server-Datenbank | 
|  | 2a | Benutzer aktiviert den Zurücksetzen-Button, um den Inhalt aller Felder zu löschen (zurück zu Step 1) | 
|  | 2 | Benutzer wird auf der weitergeleiteten Seite über den Erfolg seiner Erstellung benachrichtigt |

<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 2** | Registration eines Users | 
| Goal in Context | Erstellen eines Users als Interaktionsobjekt mit dem Server |  
| Scope & Level | Userregistration |
| Preconditions | <ul><li>Nutzer befindet sich mithilfe eines internetfähigen Webbrowsers in der Webanwendung</li></ul>|
| Success End Condition | Ein neuer User wird in der Datenbank angelegt |
| Failed End Condition | User konnte sich nicht registrieren |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer gibt<ul><li>den Vornamen,</li><li>den Nachnamen,</li><li>sein persönliches Passwort,</li><li>sein Github-Repository und </li><li>seine Expertise</li></ul>im entsprechenden Feld ein | 
|  | 2 | Benutzer aktiviert den Registrieren-Button und schickt seine Daten an die Server-Datenbank | 
|  | 2a | Benutzer aktiviert den Eingabe löschen-Button, um den Inhalt aller Felder zu löschen (zurück zu Step 1) | 
|  | 3 | Benutzer wählt seine <ul><li>Universität</li><Fakultät</li><li>Studiengang</li></ul> |
|  | 3 | Benutzer wird auf der weitergeleiteten Seite über den Erfolg seiner Erstellung benachrichtigt |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 1a | User hat keine gültigen Eingaben (z. B. E-Mail Format) eingegeben. |
|  | 1a.1 | User wird benachrichtigt das er Falscheingaben korrigieren soll. |

<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 3** | Login eines Users | 
| Goal in Context | Login eines Users als Interaktionsobjekt mit dem Server |  
| Scope & Level | User-Login |
| Preconditions | <ul><li>Nutzer befindet sich mithilfe eines internetfähigen Webbrowsers in der Webanwendung</li><li>User ist bereits registriert</li></ul>|
| Success End Condition | Ein User hat sich erfolgreich eingeloggt |
| Failed End Condition | User konnte sich nicht einloggen |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer gibt seine Login-Daten, also <ul><li>E-Mail und</li><li>Passwort</li></ul>im entsprechenden Feld ein | 
|  | 2 | Benutzer aktiviert den Login-Button und schickt seine Daten an die Server-Datenbank | 
|  | 3 | Benutzer wird auf sein Dashboard weitergeleitet |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 1a | User hat keine gültigen Eingaben (z. B. E-Mail Format) gemacht. |
|  | 1a.1 | User wird benachrichtigt, dass die Falscheingaben korrigiert werden müssen. |

<br>

**Teils-implementierte Use-Cases:**<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 4** | Fakultät erstellen | 
| Goal in Context | Erstellen einer Fakultät für den Webdienst |  
| Scope & Level | Fakultätsverwaltung |
| Preconditions | <ul><li>Zugehörige Universität vorhanden</li><li>Fakultät als Ressource noch nicht vorhanden</li><li>Nutzer befindet sich mithilfe eines internetfähigen Webbrowsers in der Webanwendung</li></ul>|
| Success End Condition | Ressource Fakultät wurde neu angelegt |
| Failed End Condition | Anlegen der Ressource Fakultät fehlgeschlagen |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer gibt<ul><li>den Namen,</li></ul>der Fakultät im entsprechenden Feld ein | 
|  | 2 | Benutzer aktiviert den Speichern-Button und schickt seine Daten an die Server-Datenbank | 
|  | 2a | Benutzer aktiviert den Zurücksetzen-Button, um den Inhalt aller Felder zu löschen (zurück zu Step 1) | 
|  | 3 | Benutzer wird auf der weitergeleiteten Seite über den Erfolg seiner Erstellung benachrichtigt |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 1a | Fakultät kann keiner Universität zugeordnet werden, weil keine zugehörige Universität vorhanden ist. |
|  | 1a.1 | Benutzer kann die zugehörige Ressource Universität anlegen. |

<br>

**Noch zu implementierende Use-Cases:**<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 5** | Hinzufügen eines Tasks zur Taskliste. | 
| Goal in Context | Erfolgreiche Bearbeitung sowie asynchrone Benachrichtigungen zu Tasks |  
| Scope & Level | Taskmanipulation |
| Preconditions | <ul><li>Es wurden bereits Tasks vom Benutzer angelegt</li><li>Optional für asynchrone Operationen wurde einem Task eine Deadline beigefügt </li></ul>|
| Success End Condition | Benutzer hat eine Übersicht von seinen Tasks. |
| Failed End Condition | Es sind keine Tasks vorhanden oder alle Tasks wurden abgearbeitet und sind als "erledigt" markiert. |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer erstellt einen Task. | 
|  | 2 | Benutzer speichert seinen Task ab. | 
|  | 3 | Alle Mitglieder der Gruppe werden über den  neuen Task informiert. | 
|  | 3 | Benutzer wird auf der weitergeleiteten Seite über seine erstellten Tasks benachrichtigt. |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 1a | User lässt das Eingabefeld frei. |
|  | 1a.1 | User wird benachrichtigt, dass er das Eingabefeld befüllen muss. |

<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 6** | Beitritt einer Gruppe | 
| Goal in Context | Ein User ist erfolgreich einer Gruppe beigetreten |  
| Scope & Level | User Goal Gruppenbeitritt |
| Preconditions | <ul><li>User ist eingeloggt</li><li>User hat eine Liste von Gruppen</li><li>User hat eine Gruppenbeitritts-Anfrage gesendet</li><li>Gruppenbeitritts-Anfrage ging an eine Gruppe, die dem Studiengang und den vorgegebenen Modulen des Users entspricht</li></ul>|
| Success End Condition | Gruppenbeitritt ist erfolgt |
| Failed End Condition | Die Gruppenbeitritts-Anfrage wurde an eine Gruppe eines Moduls geschickt, die nicht passend zum Studiengang des Users ist |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | User gibt ein Modul im Suchfeld ein | 
|  | 2 | User schickt die Suchanfrage ab durch Aktivierung des Submit-Buttons |
|  | 3 | User wählt eine Gruppe aus der Liste und Aktiviert den "Gruppenbeitritts-Anfrage senden"-Button |
|  | 4 | Nach Bestätigung der Gruppenbeitritts-Anfrage des Gruppen-Admins ist User ein Mitglied der Gruppe |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 1a | User lässt das Eingabefeld frei. |
|  | 1a.1 | User wird benachrichtigt, dass er das Eingabefeld befüllen muss. |
|  | 2a | User stellt eine Anfrage an eine Gruppe, die nicht zu seinem Studiengang passt. |
|  | 2a.1 | User wird benachrichtigt, dass er ein anderes Modul bzw. eine andere Gruppe wählen muss. |

<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 7** | Anzeigen von Tasks im Dashboard | 
| Goal in Context | Ein User hat eine Task-Übersicht |  
| Scope & Level | Dashboard-View |
| Preconditions | <ul><li>Der User ist eingeloggt</li><li>Es wurden bereits Tasks vom Benutzer angelegt</li><li>Optional für asynchrone Operationen wurde einem Task eine Deadline beigefügt </li></ul>|
| Success End Condition | Benutzer hat eine Übersicht von seinen Tasks. |
| Failed End Condition | Es sind keine Tasks vorhanden oder alle Tasks wurden abgearbeitet und sind als "erledigt" markiert. |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | ... | 


##Dienstanbieter
###Ressourcen, Parameter und deren Umsetzung

- [x] User
- [x] Login
- [x] Fakultäten
- [x] Studiengänge
- [x] Semester
- [x] Module
- [x] Gruppen
- [x] Tasks
- [ ] Newsfeeds
- [x] Dashboard


###REST-Spezifikation (Routes)
| Ressource  | HTTP-Verben | Semantik | Content-type (req) | Content-type (res) |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| /user | GET | Gibt eine Liste von allen registrierten Usern aus | text/plain | application/json |
| /user/:ID | GET | Gibt eine Liste von allen registrierten Usern aus | text/plain | application/json |
| | POST | Erstellt einen neuen User | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Users | application/json | application/json |
| | DELETE | Löscht einen bestimmten User | application/json | application/json |
| /university | GET | Gibt eine Liste von allen angelegten Universitäten aus | text/plain | application/json |
| /university/:ID | GET | Zeigt die Universitäten mit der :ID an | text/plain | application/json |
| | POST | Erstellt eine neue Universität| application/json | application/json |
| | PUT | Aktualisiert Informationen einer bestimmten Universität | application/json | application/json |
| | DELETE | Löscht ein bestimmt Universität | application/json | application/json |
| /faculty | GET | Gibt eine Liste von allen angelegten Fakultäten aus | text/plain | application/json |
| /faculty/:ID | GET | Zeigt die Fakultät mit der :ID an | text/plain | application/json |
| | POST | Erstellt eine neue Fakultät | application/json | application/json |
| | PUT | Aktualisiert Informationen einer bestimmten Fakultät | application/json | application/json |
| | DELETE | Löscht ein bestimmt Fakultät | application/json | application/json |
| /subject | GET | Gibt eine Liste von allen angelegten Modulen aus | text/plain | application/json |
| /subject/:ID | GET | Zeigt das Modulen mit der :ID an | text/plain | application/json |
| | POST | Erstellt ein neues Modulen| application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Moduls | application/json | application/json |
| | DELETE | Löscht ein bestimmtes Modulen | application/json | application/json |
| /course | GET | Gibt eine Liste von allen angelegten Studiengängen aus | text/plain | application/json |
| /course/:ID | GET | Zeigt den Studiengang mit der :ID an | text/plain | application/json |
| | POST | Erstellt eineb neue Studiengang| application/json | application/json |
| | PUT | Aktualisiert Informationen einen bestimmten UnivStudiengangersität | application/json | application/json |
| | DELETE | Löscht einen bestimmt Studiengang | application/json | application/json |
| /group | GET | Gibt eine Liste von allen angelegten Gruppen aus | text/plain | application/json |
| /group/:ID | GET | Zeigt die Gruppe mit der :ID an | text/plain | application/json |
| | POST | Erstellt eine neue Gruppe| application/json | application/json |
| | PUT | Aktualisiert Informationen einer bestimmten Gruppe | application/json | application/json |
| | DELETE | Löscht eine bestimmt Gruppe | application/json | application/json |
| /task | GET | Gibt eine Liste von allen angelegten Tasks aus | text/plain | application/json |
| /task/:ID | GET | Zeigt den Task mit der :ID an | text/plain | application/json |
| | POST | Erstellt eineb neuen Task| application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Task | application/json | application/json |
| | DELETE | Löscht einen bestimmt Task | application/json | application/json |


##Datenhaltung
Bei der Entscheidung, welches Austauschformat verwendet werden soll, fiel die Wahl auf JSON (*JavaScript Object Notation*). Im Gegensatz zum komplexen XML-Format hat JSON-Format eine kompaktere, besser strukturierte Syntax und dadurch eine geringere Dateigröße. Erst nach Erzeugung eines DOM-Baums aus einem XML-Dokument ist der Zugriff auf die Knoten gegeben und diese müssen meist mehrmals verwendet werden, was zusätzlich zu unnötigem Schreibaufwand führt. JSON stellt Daten in einer überschaubaren Liste dar, die sich geschickter verwalten lässt, auch weil man auf einfache Weise auf dessen Attribute zugreifen kann. Das Parsen von JSON-Daten mithilfe der AJAX-Technologie geht außerdem um einiges schneller. Ein Grund mehr ist, dass sich JSON mittlerweile in vielen weiteren Programmiersprachen etabliert hat.

Die Datenspeicherung erfolgt über Redis (*REmote DIctionary Server*), weil sie als In-Memory-Datenbank den Arbeitsspeicher eines Computers nutzt und somit wesentlich schneller arbeiten kann. Die Key-Value-Speicherung sorgt in diesem Fall für eine einfachere Handhabung, da die Struktur der Daten nicht besonders komplex ist.

##Dienstnutzer
Nachdem der Dienstnutzer sich eingeloggt hat, kann er die Ressource http://localhost:3001/dashboard nutzen. Aus Zeitgründen konnte kein ausgearbeitetes Login-System implementiert werden, dass Sicherheit und Privatsphäre garantiert, deshalb sind ebenso andere, nicht öffentliche Ressourcen, wie http://localhost:3001/tasks und http://localhost:3001/gruppen, durch explizite Suche einsehbar.

###Zu Use Case 1, 2 und 4
Zunächst muss eine Universität angelegt werden, um die dazugehörigen Ressourcen Fakultät, Studiengänge (courses) und Module (subjects) erstellen zu können. 

Alle Felder der HTML-Formulare sind Pflichteingabefelder. Ob ein Feld ausgefüllt wurde, wird durch das required-Attribut im input-Tag überprüft (Auszug aus *university.ejs*):
```html
		<div class="input-group">
			<label for="repository">Name der Hochschule</label> <br>
         <input class="form-control" name="name" type="text"
         	required/><br>
        </div>
```
Sobald der "Registrieren"-Button aktiviert wird, wird die Überprüfung via JavaScript durchgeführt. Im Fehlerfall erscheint unter den Buttons eine Fehlermeldung in roter Schriftfarbe (Auszug aus *university.ejs*):
```javascript
    function validateForm () {
        $ ("label").css ("color", "black");
        var failed = 0;
        $ ('input, select').filter ('[required]:visible').each (function () {
            if ($ (this).val () == '') {
                var label = $ (this).attr ('name');
                $ ("label[for='" + label + "']").css ("color", "red");
                failed = 1;
            }
        });

        if (failed) {
            $ ('#message').html ("<span class='error'>Bitte Pflichfelder ausfüllen!</span>");
            return 1;
        }
        return 0;
    }
```
Weil Interaktionen zwischen dem Browser und dem Server beeinflusst wird von HTTP-Protokollen, müssen die Daten eines Formulars durch einen standardisierten HTTP-Request an den Server geschickt werden (Auszug aus *university.ejs*):
```javascript
    $ ('.container').on ('click', '#submit', function () {
        if (validateForm ()) {
            return;
        }
        var data = $ ('#form').serialize ();

        $.ajax ({

            url: 'http://localhost:3001/university',
            type: "POST",
            data: data,
            success: function (result) {
                $ ('#message').html ("Erstelle Universität");
                window.location = "http://localhost:3001/faculty/";

            },
            error: function (xhr, resp, text) {
                $ ('#message').html (text);
            }
        })
    });
```

###Weiteres Vorgehen
Folgende Eigenschaften unserer Anwendung werden in der nächsten Bearbeitungsphase implementiert:
<ul>
<li>Query-Parameter: Gruppensuche</li>
<li>Listenressource: Newsfeeds</li>
</ul>

##Anleitung
###Start der Server
Auszuführende Datein: 
<ul>
	<li>project/application/bin/www</li>
	<li>project/service/bin/www.js</li>
</ul>

Nach der Ausführung startet die die Application auf Port 3001 und ist unter http://localhost:3001/ erreichbar. Der Service hört auf Port 3000 und ist über die URL http://localhost:3000/ erreichbar.

###Anlegen der Strukturen
Über die URL http://localhost:3001/university wird ein Setup aufgerufen. Hier können die Strukturen über eine simple Oberfläche erstellt werden.
Angefangen mit einer Universität -> Fakultät -> Studiengangs -> Modul wird die Struktur erstellt.

###Registration
Um die Applikation nutzen zu können ist eine Registrierung notwendig, diese ist unter http://localhost:3001/registration zu finden. Nach erfolgreichem Login unter http://localhost:3001/login können folgende Aktionen über die linke Navigation erreicht und ausgeführt werden.

####Grupppe finden
Die hier zu findenen Felder dienen zu Filterung von Gruppen. Über die Schaltfläche "betrete" wird der User Mitglied der Gruppe. Er sieht nun einen Link zur Gruppe auf seinem Dashboard und wird über Änderungen in Gruppe informiert. 

####Grupppe erstellen
Alle nutzer haben das Rech Gruppen zu erstellen.

####Grupppe betreten
Wird über das Dashboard eine Gruppe ausgewählt, werden alle Taks der Gruppe aufgelistet. Tasks die dem User zugewiesen sind können als "fertig gestellt" makiert werden. Außerdem können Tasks übernommen werden. Alle Mitglieder der Gruppe, die ebenfalls online das Tool nutzen, werden über Änderungen in der Gruppe informiert.

##Probleme
Leider haben zwei von drei Gruppenmitglieder das Team vorzeitige verlassen. Dadurch wurde das Projekt quasi in einzelarbeit Umgesetzt. Dazu kam es natürlich zu zeitlichen Engpässen. 
Gründe für das vorzeitgige Verlassen der Mitglieder sind von persönlicher Natur. Ich sehe das Problem in der Motivation der Gruppe und der wahrscheinlich auch teilweise Überforderung der Mitglieder.
Dadurch, dass die Mitglieder sich nicht im Vorfeld kannten, waren die Arbeitsmethoden untereinander nicht bekannt und haben ebenfalls zu Problemen geführt. Ich bedauer sehr das die Gruppe auseinander gegangen ist und ich nicht in der Lage war meine Gruppenmitglieder ausreichend zu motivieren.

##Fazit
Zuallererst, trotz genannter Probleme wurde das Projekt erfolgreich beendet.
Das arbeiten mit NodeJS zeigte sich als sehr ungewohnt. Zuvor wurde noch nicht mit einer Event basierender Programmiersprache entwickelt. Nach kurzer Einarbeitung konnten jedoch schnell Fortschritte erzielt werden. 
Die größten Herausforderungen sah ich im Umgang mit SocketIO und Express Routes. Für die Anwendung dieser Pakete musste ich mich genauer mit Middelware und Asynchronen Methoden beschäftigen.
Eine Service-Application Struktur muss genau durchdacht werden und brauch viel Planung. Die Durchführung und Entwicklung profetiert jedoch sehr dadurch. 

##Arbeitsmatrix
|               | Jan Wegmeth | Krystian Schindler | Natalie Tork Alinaghipour | 
|--------------:|------------ |:------------------:| -------------------------:|
| Konzeption    | 60%         | 20%                |20%                        |
| Dokumentation | 60%         | 30%                |10%                        |
| Dienstgebener | 100%        | 0%                 |0%                         |
| Dienstnutzer  | 100%        | 0%                 |0%                         |







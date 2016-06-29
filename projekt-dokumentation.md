# WBA2 - Projekt-Dokumentation
Ein Projekt von Team 14 / NovaPixels <br><br>
Team-Mitglieder: <ul><li>Jan Wegmeth</li><li>Krystian Schindler</li><li>Natalie Tork Alinaghipour</li></ul>

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
die Newsfeeds abonniert. So muss er sich nicht mehr über all die Seiten auf dem aktuellsten Stand halten. 
Hat er ein Modul abgeschlossen, kann er die Benachrichtigungen abbestellen.
<br>

###Konzept 
Um die Anwendung nutzen zu können, muss zuerst ein Benutzer-Account erstellt werden. Dafür sind ein persönliches 
Kennwort, eine eMail-Addresse und weitere Pflichtangaben (s. Use Case Nr. ?) notwendig. Nach dem Log-In erscheint 
die Startseite in Form eines Dashboards. 

Es stehen folgende Funktionalitäten zur Auswahl:
-	thematische, modulbezogene Newsfeeds
-	Gruppen

**Thematische, modulbezogene Newsfeeds:**<br>
Mithilfe dieser Funktion hat der User die Möglichkeit, Neuigkeiten zu den Modulen zu erhalten, die er abonniert hat. 

**Gruppen:**<br>
Für jedes Modul ist es möglich, Gruppen zu bilden. Benutzer können nach den gewünschten Gruppen suchen und eine
Beitrittsanfrage senden. Jedes Gruppenmitglied kann Tasks erstellen, die zu einem bestimmten Zeitpunkt erledigt sein sollen und 
entweder als offen oder erledigt markiert werden können. 

##Use Cases

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
|  | 1 | Benutzer gibt<ul><li>den Namen,</li><li>das Motto,</li><li>das Gründungsjahr,</li><li>den Hauptsitz,</li><li>das Land,</li><li>das Bundesland,</li><li>die Stadt und</li><li>die Website</li></ul>der Universität im entsprechenden Feld ein | 
|  | 2 | Benutzer aktiviert den Speichern-Button und schickt seine Daten an die Server-Datenbank | 
|  | 2a | Benutzer aktiviert den Zurücksetzen-Button, um den Inhalt aller Felder zu löschen (zurück zu Step 1) | 
|  | 2 | Benutzer wird auf der weitergeleiteten Seite über den Erfolg seiner Erstellung benachrichtigt |

<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 2** | Fakultät erstellen | 
| Goal in Context | Erstellen einer Fakultät für den Webdienst |  
| Scope & Level | Fakultätsverwaltung |
| Preconditions | <ul><li>Zugehörige Universität vorhanden</li><li>Fakultät als Ressource noch nicht vorhanden</li><li>Nutzer befindet sich mithilfe eines internetfähigen Webbrowsers in der Webanwendung</li></ul>|
| Success End Condition | Ressource Fakultät wurde neu angelegt |
| Failed End Condition | Anlegen der Ressource Fakultät fehlgeschlagen |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer gibt<ul><li>den Namen,</li><li>den Standort,</li><li>die Stadt und</li><li>die Website</li></ul>der Fakultät im entsprechenden Feld ein | 
|  | 2 | Benutzer aktiviert den Speichern-Button und schickt seine Daten an die Server-Datenbank | 
|  | 2a | Benutzer aktiviert den Zurücksetzen-Button, um den Inhalt aller Felder zu löschen (zurück zu Step 1) | 
|  | 3 | Benutzer wird auf der weitergeleiteten Seite über den Erfolg seiner Erstellung benachrichtigt |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 2a | Fakultät kann keiner Universität zugeordnet werden, weil keine zugehörige Universität vorhanden ist. |
|  | 2a.1 | Benutzer kann die zugehörige Ressource Universität anlegen. |

##Dienstanbieter
###REST-Spezifikation (Routes)
| Ressource  | HTTP-Verben | Semantik | Content-type (req) | Content-type (res) |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| /user | GET | Gibt eine Liste von allen registrierten Usern aus | text/plain | application/json |
| /user/:ID | GET | Gibt eine Liste von allen registrierten Usern aus | text/plain | application/json |
| | POST | Erstellt einen neuen User | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Users | application/json | application/json |
| | DELETE | Löscht einen bestimmten User | application/json | application/json |
| /user/:ID/dashboard | GET | Gibt das Dashboard eines einzelnen Users über seine ID aus | text/plain | application/json |
| /user/:ID/personal_tasks | GET | Gibt eine Liste der Personal Tasks aus | text/plain | application/json |
| /user/:UID/personal_tasks/:ID | GET | Gibt einen bestimmten Personal Task zurück | text/plain | application/json |
| | POST | Fügt einen neuen Personal Task hinzu | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Tasks | application/json | application/json |
| | DELETE | Löscht einen bestimmten Task | application/json | application/json |
| /user/:ID/einstellungen | GET | Gibt eine Liste der Einstellungsoptionen aus | text/plain | application/json |
| | PUT | Aktualisiert Einstellungsoptionen eines bestimmten Users | application/json | application/json |
| /fakultaeten | GET | Gibt eine Liste der Fakultäten aus | text/plain | application/json |
| /fakultaeten/:ID | GET | Gibt eine einzelne Fakultät über die ID aus | text/plain | application/json |
| | POST | Fügt eine neue Fakultät hinzu | application/json | application/json |
| | PUT | Aktualisiert Informationen einer bestimmten Fakultät | application/json | application/json |
| | DELETE | Löscht eine bestimmte Fakultät | application/json | application/json |
| /fakultaeten/:FID/studiengaenge | GET | Gibt eine Liste der Studiengänge aus | text/plain | application/json |
| /fakultaeten/:FID/studiengaenge/:ID | GET | Gibt einen bestimmten Studiengang über die ID aus | text/plain | application/json |
| | POST | Erstellt einen neuen Studiengang | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Studiengangs | application/json | application/json |
| | DELETE | Löscht einen bestimmten Studiengang | application/json | application/json |
| /studiengaenge/:STID/pinboards/:ID | GET | Gibt eine Pinnwand eines Studienganges über eine bestimmte ID aus | text/plain | application/json |
| | POST | Erstellt eine neue Pinnwand für einen Studiengang | application/json | application/json |
| | PUT | Aktualisiert Informationen einer bestimmten Pinnwand | application/json | application/json |
| /studiengaenge/:STID/semester | GET | Gibt eine Liste der Semester eines Studiengangs aus | text/plain | application/json |
| /studiengaenge/:STID/semester/:ID | GET | Gibt ein bestimmtes Semester eines Studiengangs via ID aus | text/plain | application/json |
| | POST | Fügt ein neues Semester eines Studiengangs hinzu | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Semesters | application/json | application/json |
| /fakultaet/:FID/module | GET | Gibt eine Liste der Module eines bestimmten Semesters aus | text/plain | application/json |
| /fakultaet/:FID/module/:ID | GET | Gibt ein Modul mithilfe der zugeordneten ID aus | text/plain | application/json |
| | POST | Erstellt ein neues Modul für einen Studiengang im jeweiligen Semester  | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Moduls | application/json | application/json |
| | DELETE | Löscht ein bestimmtes Modul | application/json | application/json |
| /module/:MID/newsfeed/:ID | GET | Gibt einen Newsfeed eines bestimmten Moduls via ID zurück | text/plain | application/json |
| | POST |  Erstellt einen neuen Newsfeed für ein Modul | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Newsfeeds | application/json | application/json |
| | DELETE | Löscht einen bestimmten Newsfeed | application/json | application/json |
| /semester/:SID/gruppen | GET | Gibt eine Liste der Gruppen eines bestimmten Studiengangs aus | text/plain | application/json |
| /module/:MID/gruppen | GET | Gibt eine Liste der Gruppen eines bestimmten Moduls aus | text/plain | application/json |
| /fakultaet/:FID/module/:MID/gruppen/:ID | GET | Gibt eine über die ID bestimmte Gruppe aus | text/plain | application/json |
| | POST | Erstellt eine neue Gruppe für ein bestimmtes Modul | application/json | application/json |
| | PUT | Aktualisiert Informationen einer bestimmten Gruppe | application/json | application/json |
| | DELETE | Löscht eine bestimmte Gruppe | application/json | application/json |
| /module/:MID/gruppen/:GID/tasks | GET | Gibt eine Liste der Tasks einer bestimmten Gruppe aus | text/plain | application/json |
| /module/:MID/gruppen/:GID/tasks/:ID | GET | Gibt einen über die ID bestimmten Task einer bestimmten Gruppe aus | text/plain | application/json |
| | POST | Fügt einen neuen Task in einer bestimmten Gruppe hinzu | application/json | application/json |
| | PUT | Aktualisiert Informationen eines bestimmten Gruppen-Tasks | application/json | application/json |
| | DELETE | Löscht einen bestimmten Gruppen-Task | application/json | application/json |
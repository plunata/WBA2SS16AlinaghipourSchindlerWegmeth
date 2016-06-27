
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

<br>
<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 3** | Registration eines Users | 
| Goal in Context | Erstellen eines Users als Interaktionsobjekt mit dem Server |  
| Scope & Level | Userregistration |
| Preconditions | <ul><li>Nutzer befindet sich mithilfe eines internetfähigen Webbrowsers in der Webanwendung</li></ul>|
| Success End Condition | Ein neuer User wird in der Datenbank angelegt |
| Failed End Condition | User konnte sich nicht registrieren |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer gibt<ul><li>das Geschlecht,</li><li>den Vornamen,</li><li>den Nachnamen,</li><li>sein persönliches Passwort,</li><li>sein Github-Repository und </li><li>seine Expertise</li></ul>im entsprechenden Feld ein | 
|  | 2 | Benutzer aktiviert den Registrieren-Button und schickt seine Daten an die Server-Datenbank | 
|  | 2a | Benutzer aktiviert den Eingabe löschen-Button, um den Inhalt aller Felder zu löschen (zurück zu Step 1) | 
|  | 3 | Benutzer wird auf der weitergeleiteten Seite über den Erfolg seiner Erstellung benachrichtigt |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 2a | User hat keine gültigen Eingaben (z. B. E-Mail Format) eingegeben. |
|  | 2a.1 | User wird benachrichtigt das er Falscheingaben korrigieren soll. |

<br>
<br>

| | | 
| ------------- | ------------- | ------------- |
| **USE CASE # 4** | Hinzufügen eines Tasks zur Taskliste. | 
| Goal in Context | Erfolgreiche Bearbeitung sowie asynchrone Benachrichtigungen zu Tasks |  
| Scope & Level | Taskmanipulation |
| Preconditions | <ul><li>Es wurden bereits Tasks vom Benutzer angelegt</li><li>Optional für asynchrone Oparationen wurde einem Task eine Deadline beigefügt </li></ul>|
| Success End Condition | Benutzer hat einen Übersicht über seine Tasks. |
| Failed End Condition | Es sind keine Tasks vorhanden oder alle Tasks wurden abgearbeitet und sind als "erledigt" markiert. |
| Primary Actor | Student |

| Description  | Step | Action | 
| ------------- | ------------- | ------------- |
|  | 1 | Benutzer erstellt einen Task. | 
|  | 1a | Benutzer fügt dem Task eine Deadline bei und wird benachrichtigt, sobald sich diese nähert (Asynchrone Operation). | 
|  | 2 | Benutzer speichert seinen Task ab. | 
|  | 3 | Benutzer wird auf der weitergeleiteten Seite über seine erstellten Tasks benachrichtigt. |

| Extensions  | Step | Branching Action | 
| ------------- | ------------- | ------------- |
|  | 2a | User lässt das Eingabefeld frei. |
|  | 2a.1 | User wird benachrichtigt, dass er das Eingabefeld befüllen muss. |

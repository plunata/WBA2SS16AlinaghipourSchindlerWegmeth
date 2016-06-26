
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
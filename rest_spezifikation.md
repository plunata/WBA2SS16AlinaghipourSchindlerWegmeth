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

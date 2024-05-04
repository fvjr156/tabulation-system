CREATE DATABASE IF NOT EXISTS tabulation_system;

DROP DATABASE tabulation_system;

USE tabulation_system;

CREATE TABLE tblUsers (
    UserID INTEGER PRIMARY KEY AUTO_INCREMENT,
    RoleID INTEGER,
    UserPassword VARCHAR(512),
    UserFirstName VARCHAR(64) DEFAULT 'Anon',
    UserSurname VARCHAR(64) DEFAULT 'dela Cruz',
    Username VARCHAR(64),
    UserEmail VARCHAR(64) DEFAULT 'NONE',
    isVoided BOOLEAN,
    FOREIGN KEY (RoleID) REFERENCES tblRoles(RoleID)
);

CREATE TABLE tblRoles (
    RoleID INTEGER PRIMARY KEY AUTO_INCREMENT,
    RoleName VARCHAR(64) DEFAULT 'NONE'
);

CREATE TABLE tblEvent (
    EventID INTEGER PRIMARY KEY AUTO_INCREMENT,
    EventName VARCHAR(64),
    EventDescription VARCHAR(512)
);

CREATE TABLE tblContestants (
    ContestantID INTEGER PRIMARY KEY AUTO_INCREMENT,
    ContestantName VARCHAR(64),
    EventID INTEGER,
    FOREIGN KEY (EventID) REFERENCES tblEvent(EventID)
);

CREATE TABLE tblCriteria (
    CriterionID INTEGER PRIMARY KEY AUTO_INCREMENT,
    EventID INTEGER,
    Criterion VARCHAR(512),
    CriterionWeight FLOAT,
    FOREIGN KEY (EventID) REFERENCES tblEvent(EventID)
);

CREATE TABLE tblJudgesEventAccess (
    UserID INTEGER,
    EventID INTEGER,
    FOREIGN KEY (UserID) REFERENCES tblUsers(UserID),
    FOREIGN KEY (EventID) REFERENCES tblEvent(EventID)
);

INSERT INTO tabulation_system.tblroles
(RoleID, RoleName)
values
(1, 'admin'),
(2, 'manager'),
(3, 'judge');

INSERT INTO tabulation_system.tblusers
(UserID, RoleID, UserPassword, UserFirstName, UserSurname, Username, UserEmail, isVoided)
values
-- fvjr156admin
(1, 1, '86ac5d0e0f18f5d7f3b64daab295c39924f2c75d166446107f9b6991f04d8fe5', 'Fernando Jr.', 'Villanueva', 'fvjr156', 'juniorvillanueva156@gmail.com', 0),
-- myneighborsushicat
(2, 2, '8465ca3e089dddc0239bab1d2afcbb754ac76c73a2aafcceadbd9159496dbb0c', 'Christopher', 'Fegalan', 'xtopher', 'fegalanxtopher@examplemail.ru', 0),
(3, 2, '8465ca3e089dddc0239bab1d2afcbb754ac76c73a2aafcceadbd9159496dbb0c', 'Argie', 'Delgado', 'koni', 'konisenpiaaaxd@examplemail.ru', 0),
(4, 2, '8465ca3e089dddc0239bab1d2afcbb754ac76c73a2aafcceadbd9159496dbb0c', 'Khyle Myrvin', 'Macasilhig', 'khylepogi', 'khylepogi123@examplemail.ru', 0),
(5, 2, '8465ca3e089dddc0239bab1d2afcbb754ac76c73a2aafcceadbd9159496dbb0c', 'Jude Cedric', 'Seguin', 'jood', 'joodcutiepatotie@examplemail.ru', 0),
(6, 2, '8465ca3e089dddc0239bab1d2afcbb754ac76c73a2aafcceadbd9159496dbb0c', 'Ryan', 'Consigna', 'raiconsigna', 'consignarai@examplemail.ru', 0);

INSERT INTO tabulation_system.tblusers
(UserID, RoleID, UserPassword, UserFirstName, UserSurname, Username, UserEmail, isVoided)
values
-- judge
(7, 3, '10e86c6514d40f2a3e861b31847340ee8c8ed181029a17b042f137121d28863e', 'Lain', 'Iwakura', 'smartbro', 'wired_lain@examplemail.ru', 0),
(8, 3, '10e86c6514d40f2a3e861b31847340ee8c8ed181029a17b042f137121d28863e', 'Tomoko', 'Kuroki', 'kurokitomoko', 'mokocchii1@examplemail.ru', 0),
(9, 3, '10e86c6514d40f2a3e861b31847340ee8c8ed181029a17b042f137121d28863e', 'Konata', 'Izumi', 'konat', 'densetsu_shoujo@examplemail.ru', 0),
(10, 3, '10e86c6514d40f2a3e861b31847340ee8c8ed181029a17b042f137121d28863e', 'Hitori', 'Gotoh', 'guitarhero', 'guitarhero@examplemail.ru', 0),
(11, 3, '10e86c6514d40f2a3e861b31847340ee8c8ed181029a17b042f137121d28863e', 'Ayumu', 'Kasuga', 'osaka', 'oosaka1984@examplemail.ru', 0);

INSERT INTO tabulation_system.tblevent
(EventID, EventName, EventDescription)
values
(1, 'Miss Concepcion Uno 2024', 'Beauty Pageant ng mga nag-gagandahang binibini ng Barangay Concepcion Uno.'),
(2, 'Tawag ng Tanggalan Singing Contest 2024', 'Kilalanin ang nag-gagalingang kalahok sa pagkanta.');

INSERT INTO tabulation_system.tbljudgeseventaccess
(UserID, EventID)
values
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2);

INSERT INTO tabulation_system.tblcontestants
(ContestantID, ContestantName, EventID)
values
(1, 'Teresa Teng', 2),
(2, 'Lea Salonga', 2),
(3, 'Whitney Houston', 2),
(4, 'Celine Dion', 2),
(5, 'Regine Velazquez-Alcasid', 2);

INSERT INTO tabulation_system.tblcriteria
(CriterionID, EventID, Criterion, CriterionWeight)
values
(1, 2, 'Voice Quality (vocal intonation and projection, accuracy of pitch, tone color)', 0.5),
(2, 2, 'Diction (color of vowels, proper emphasis or accent on the words)', 0.15),
(3, 2, 'Timing (softness and loudness, rhythm)', 0.2),
(4, 2, 'Interpretation and Stage Presence (facial expression, proper focus)', 0.15);
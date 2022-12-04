-- SQLite
CREATE VIEW viewGame1 
AS 

SELECT
    rank.puntaje as Puntuacion,
    jugador.name as Nombre
FROM
    App_juego_jugador as rank,
    App_juego as juego,
    App_jugador as jugador
WHERE
    rank.id_Juego_id = 1 AND
    rank.id_Jugador_id = jugador.id


SELECT
    *
FROM
    viewGame1



DROP VIEW viewGame4;

CREATE VIEW viewGame2
AS 

SELECT
    rank.puntaje as Puntuacion,
    jugador.name as Nombre
FROM
    App_juego_jugador as rank,
    App_juego as juego,
    App_jugador as jugador
WHERE
    rank.id_Juego_id = 2 AND
    rank.id_Jugador_id = jugador.id

CREATE VIEW viewGame3
AS 

SELECT
    rank.puntaje as Puntuacion,
    jugador.name as Nombre
FROM
    App_juego_jugador as rank,
    App_juego as juego,
    App_jugador as jugador
WHERE
    rank.id_Juego_id = 3 AND
    rank.id_Jugador_id = jugador.id

CREATE VIEW viewGame4 
AS 

SELECT
    rank.puntaje as Puntuacion,
    jugador.name as Nombre
FROM
    App_juego_jugador as rank,
    App_juego as juego,
    App_jugador as jugador
WHERE
    rank.id_Juego_id = 4 AND
    rank.id_Jugador_id = jugador.id

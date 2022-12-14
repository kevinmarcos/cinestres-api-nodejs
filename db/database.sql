CREATE DATABASE cinestres;

use cinestres;

-- DataBase Tables

CREATE TABLE Usuarios(
    id INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    edad int not null,
    correo VARCHAR(50),
    PRIMARY KEY (id)
);

INSERT INTO Usuarios (nombre, edad, correo) VALUES ("Kevin",19,"74053373@certus.edu.pe"),
("Robert",28,"robert123@gmail.com"),
("Nataly",29,"nataly123@gmail.com"),
("Marcos",55,"marcos123@gmail.com"),
("Lucila",45,"luci123@gmail.com");
-- -----------------------------------------
CREATE TABLE Promociones(
    id INT AUTO_INCREMENT,
    socio VARCHAR(50) NOT NULL,
    descuento VARCHAR(10),
    PRIMARY KEY (id)
);

INSERT INTO Promociones (socio, descuento) VALUES ("TechNews", "15%");
INSERT INTO Promociones (socio, descuento) VALUES ("HealthApp", "20%");
INSERT INTO Promociones (socio, descuento) VALUES ("Facturing Co.", "30%");
-- -----------------------------------------
CREATE TABLE Costos(
    id INT AUTO_INCREMENT,
    dia VARCHAR(10) NOT NULL,
    precio FLOAT,
    PRIMARY KEY (id)
);

INSERT INTO Costos (dia, precio) VALUES ("Lunes", 15),
("Martes", 15),
("Miercoles", 15),
("Juevez", 15),
("Viernes", 15),
("Sabado", 25),
("Domingo", 30);
-- -----------------------------------------
CREATE TABLE Cines(
    id INT AUTO_INCREMENT,
    ubicacion VARCHAR(120),
    distrito VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO Cines (ubicacion, distrito) VALUES ("Jr. Hola Mundo 1324","San Borja"),
("Jr. Pedre Picapiedra 1546","La Molina"),
("Jr. Lolas 1021","Comas"),
("Jr. Investigacion 1320","El Rimac"),
("Jr. Esternocleidomastoideo 7910","Pueblo Libre");
-- -----------------------------------------
CREATE TABLE Salas(
    id INT AUTO_INCREMENT,
    sala INT NOT NULL,
    estado INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO Salas (sala, estado) VALUES (1,1),
(2,1),
(3,1);
-- -----------------------------------------
CREATE TABLE Peliculas(
    id INT AUTO_INCREMENT,
    nombre VARCHAR (100) NOT NULL,
    director VARCHAR (100) NOT NULL,
    diaEstreno DATE NOT NULL,
    genero VARCHAR(100) NOT NULL,
    duracion TIME NOT NULL,
    pais VARCHAR(50) NOT NULL,
    sinopsis text,
    estado INT NOT NULL,
    img text,
    PRIMARY KEY (id)
);

INSERT INTO Peliculas (nombre, director, diaEstreno, genero, duracion, pais, sinopsis, estado, img) VALUES (
    "Toy Story", "John Lasseter","2022-12-06", "Animaci??n, Comedia, Aventura, Infantil",
    "01:21:00","Estados Unidos","Toy Story comienza con una misi??n de reconocimiento 
    realizada por un grupo de juguetes, encabezados por el vaquero Woody, para identificar 
    los obsequios recibidos por su propietario, Andy, con motivo de su s??ptimo cumplea??os. 
    Entre los regalos se encuentra una figura de acci??n, el guardi??n espacial Buzz Lightyear, 
    que r??pidamente pasa a ser el predilecto del ni??o. Si bien la mayor??a de los juguetes, 
    entre ellos Bo Peep, Mr. Potato Head, Hamm, Slinky y Rex, reciben con entusiasmo a Buzz, 
    Woody busca deshacerse en secreto de ??l por haberlo sustituido como el mu??eco favorito de 
    Andy. Por otra parte, Buzz desconoce su identidad como un juguete y cree que su objetivo es 
    regresar de vuelta a su planeta natal.", 1, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Toy_Story.svg/800px-Toy_Story.svg.png"
),(
    "Kung Fu Panda", "Mark Osborne y John Wayne Stevenson","2023-01-25", "	Animaci??n, Aventura,
    Comedia, Infantil, Wuxia",
    "01:32:00","Estados Unidos - China","El panda Po trabaja en la tienda de fideos de su familia 
    y sue??a en convertirse en un maestro del kung-fu. Su sue??o se hace una realidad 
    cuando es inesperadamente elegido para cumplir una antigua profec??a y debe estudiar artes marciales 
    con sus ??dolos, los Cinco Furiosos. Po necesitar?? toda la sabidur??a, fortaleza y habilidades para 
    poder proteger a su gente de Tai Lung, un maldito leopardo de nieve.", 1, 
    "https://static.wikia.nocookie.net/kungfupanda/images/f/ff/Kung-fu-panda-poster.jpg/revision/latest?cb=20120911211015&path-prefix=es"
),(
    "Madagascar", "Eric Darnell - Tom McGrath","2022-011-13", "	Animaci??n,Comedia",
    "01:26:00","Estados Unidos","Alex el le??n es el rey de la selva urbana: es la atracci??n estelar del 
    zoo neoyorquino de Central Park. Como sus mejores amigos, Marty la cebra, Melman la jirafa y Gloria 
    la hipop??tamo, Alex ha pasado toda su vida en feliz e ignorante cautividad, bien alimentado y en una 
    jaula con excelentes vistas al parque. No contento con su vida, Marty se deja llevar por la curiosidad 
    y con ayuda de unos prodigiosos ping??inos, escapa del zoo para conocer mundo, con la intenci??n de volver 
    antes de que se haga de d??a. Alex, Melman y Gloria descubren su fuga y deciden salir en su busca antes 
    de que alguien se de cuenta de su desaparici??n. Incluso en una ciudad como Nueva York, no deja de 
    llamar la atenci??n ver a un le??n, una jirafa y un hipop??tamo andando por la calle y montando en 
    metro. Los tres amigos consiguen encontrar a Marty en la estaci??n Central, pero antes de que 
    puedan volver al zoo los capturan y los embarcan con rumbo a ??frica. Los ping??inos sabotean 
    el crucero y los cuatro amigos aparecen en una playa de la ex??tica isla de Madagascar. 
    Estos nativos de Nueva York deben aprender a sobrevivir en estado silvestre; es entonces 
    cuando comprenden el sentido de la expresi??n ???el mundo de ah?? fuera es una jungla???.", 1, 
    "https://pics.filmaffinity.com/madagascar-361011039-large.jpg"
);

-- -----------------------------------------
CREATE TABLE Asientos_Cines(
    id INT AUTO_INCREMENT,
    asiento VARCHAR(3) NOT NULL,
    estado INT NOT NULL,
    idCines INT NOT NULL,
    idSala INT NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (idCines) REFERENCES Cines(id),
    FOREIGN KEY (idSala) REFERENCES Salas(id)
);

INSERT INTO Asientos_Cines (asiento, estado, idCines, idSala) VALUES ("A1",1,1,1),
("A2",1,1,1),
("A3",1,1,1),
("A4",1,1,1),
("A5",1,1,1),
("A1",1,2,2),
("A2",1,2,2),
("A3",1,2,2),
("A4",1,2,2),
("A5",1,2,2),
("A1",1,3,3),
("A2",1,3,3),
("A3",1,3,3),
("A4",1,3,3),
("A5",1,3,3);
-- -----------------------------------------
CREATE TABLE Compras_Realizadas(
    id INT AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idPelicula INT NOT NULL,
    idAsientos_Cines INT NOT NULL,
    idCostos INT NOT NULL,
    idPromociones INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(id),
    FOREIGN KEY (idPelicula) REFERENCES Peliculas(id),
    FOREIGN KEY (idAsientos_Cines) REFERENCES Asientos_Cines(id),
    FOREIGN KEY (idCostos) REFERENCES Costos(id),
    FOREIGN KEY (idPromociones) REFERENCES Promociones(id)
);

INSERT INTO Compras_Realizadas (idUsuario, idPelicula, idAsientos_Cines, idCostos, idPromociones) VALUES (
    1,1,1,1,1
);
-- -----------------------------------------

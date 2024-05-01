Create database BDAseinfo2

Use BDAseinfo2




create table Usuarios(
	IdUsuario int identity(1,1),
	Nombres varchar(100),
	Apellidos varchar(100),
	Numero int, 
	Correo varchar(250),
	Contrañsea varchar(250),
	constraint  pk_Usuarios primary key  (IdUsuario)
)

create table Salas (
	IdSala int identity(1,1),
	Nombre varchar(100),
	Capacidad int,
	Estado int,
	IdUsuario int  not null,
	constraint  pk_Salas primary key  (IdSala),
	constraint fk_salas_IdUsuario foreign key(IdUsuario) references Usuarios(IdUsuario)
)



Create table Reservas (
	IdReserva int identity (1,1) NOT NULL,
	Nombre varchar(200),
	IdSala int constraint fk_Reservas_IdSala foreign key    references Salas(IdSala),
	Fecha date,
	HoraInicio time,
	Duracion FLOAT,
	Estado bit,
	IdUsuario int  not null,
	EsCliente bit not null,
	constraint  pk_Reservas primary key  (IdReserva),
	constraint fk_Reservas_IdUsuario foreign key(IdUsuario) references Usuarios(IdUsuario)
)

Create table Cancelacion (
	IdCancelacion int identity (1,1) NOT NULL,
	IdReserva int constraint fk_Cancelacion_IdReserva foreign key  references Reservas(IdReserva),
	Motivo Varchar(250),
	Fecha date,
	IdUsuario int  not null,
	constraint  pk_Cancelacion primary key  (IdCancelacion),
	constraint fk_Cancelacion_IdUsuario foreign key(IdUsuario) references Usuarios(IdUsuario)	
)




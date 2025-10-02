import { DataSource } from 'typeorm';
import { config } from '../config';
import { Usuario } from '../entities/Usuario';
import { Equipo } from '../entities/Equipo';
import { TipoEquipo } from '../entities/TipoEquipo';
import { Ubicacion } from '../entities/Ubicacion';

// Crea una instancia de DataSource (la forma moderna de manejar la conexión en TypeORM)
export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true, // ¡Usar solo en desarrollo! Esto crea automáticamente las tablas.
    logging: false, // Desactiva el log SQL en la consola
    entities: [Usuario, Equipo, TipoEquipo, Ubicacion], // Agrega todas tus entidades aquí
    subscribers: [],
    migrations: [],
});

/**
 * Función para inicializar la conexión a la base de datos.
 */
export const initializeDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log(" Conexión a la base de datos PostgreSQL establecida.");
    } catch (error) {
        // El error "client password must be a string" se capturaría aquí
        console.error(" Error de conexión DB:", error);
        // Opcional: Detener la aplicación si la DB no está disponible
        process.exit(1); 
    }
};
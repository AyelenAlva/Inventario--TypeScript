import 'reflect-metadata'; // Importante para TypeORM y decoradores
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { initializeDB, AppDataSource } from './db/connection';
import { config } from './config';

import authRoutes from './routes/auth.routes';
import equipoRoutes from './routes/equipo.routes';


const app: Application = express();

// Middlewares
app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json()); 
// --- RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/equipos', equipoRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 404,
        mensaje: "Ruta no encontrada."
    });
});


const startServer = async () => {
¿¿    await initializeDB(); 

    app.listen(config.port, () => {
        console.log(`Servidor corriendo en http://localhost:${config.port}`);
    });
};

startServer();
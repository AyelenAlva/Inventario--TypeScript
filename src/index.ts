import * as dotenv from 'dotenv';
import * as path from 'path';


dotenv.config({
    path: path.resolve(__dirname, '../../.env') 
});

export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secreto-por-defecto-inseguro',
    db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
};
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Usuario } from '../entities/Usuario';
import { config } from '../config'; 

declare global {
    namespace Express {
        interface Request {
            user?: Usuario;
        }
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; /

        jwt.verify(token, config.jwtSecret, async (err, payload: any) => {
            if (err) {
                return res.status(403).json({ status: 403, mensaje: 'Token inválido o expirado.' });
            }
            
            try {
                const user = await Usuario.findOne({ where: { id: payload.id }, select: ["id", "rol", "email", "nombre"] });
                
                if (!user) {
                    return res.status(401).json({ status: 401, mensaje: 'Usuario no encontrado.' });
                }

                req.user = user; // Adjuntamos el objeto Usuario (sin contraseña) a la request
                next();
            } catch (dbError) {
                return res.status(500).json({ status: 500, mensaje: 'Error interno al verificar usuario.' });
            }
        });
    } else {
        res.status(401).json({ status: 401, mensaje: 'Acceso denegado. Se requiere un token de autenticación.' });
    }
};
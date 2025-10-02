import { Request, Response, NextFunction } from 'express';

type Rol = 'admin' | 'user';

export const checkRole = (allowedRoles: Rol[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ status: 401, mensaje: 'Error de autenticación: Usuario no adjunto a la solicitud.' });
        }

        if (allowedRoles.includes(user.rol)) {
            next(); // El rol es permitido, continuar
        } else {
            res.status(403).json({
                status: 403,
                error: 'Forbidden',
                mensaje: 'Acceso denegado. No tienes los permisos requeridos para esta acción.'
            });
        }
    };
};
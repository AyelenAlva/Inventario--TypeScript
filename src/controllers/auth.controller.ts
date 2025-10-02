import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../services/auth.service';

export class AuthController {
    
    public static async login(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        
        const { email, password } = req.body;
        
        try {
            const result = await AuthService.login(email, password);
            
            if (!result) {
                return res.status(401).json({ status: 401, mensaje: 'Credenciales inválidas.' });
            }
            
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, mensaje: 'Error interno en el servidor.' });
        }
    }
    
    public static async register(req: Request, res: Response) {
        const { nombre, email, password, rol = 'user' } = req.body;

        if (rol === 'admin' && req.user!.rol !== 'admin') {
            return res.status(403).json({ status: 403, mensaje: 'No puedes registrar a un usuario con rol de administrador.' });
        }
        
        try {
            const newUser = await AuthService.register(nombre, email, password, rol);
            return res.status(201).json({ id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol });
        } catch (error: any) {
            if (error.message.includes('Email duplicado')) {
                 return res.status(400).json({ status: 400, mensaje: error.message });
            }
            return res.status(500).json({ status: 500, mensaje: 'Error interno al registrar usuario.' });
        }
    }
}
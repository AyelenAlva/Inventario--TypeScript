import { Usuario } from '../entities/Usuario';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

const SALT_ROUNDS = 10;

export class AuthService {
    
    public static async login(email: string, password_plano: string): Promise<{ token: string, user: { id: number, email: string, rol: string } } | null> {
        const user = await Usuario.createQueryBuilder("usuario")
            .addSelect("usuario.password")
            .where("usuario.email = :email AND usuario.activo = true", { email })
            .getOne();

        if (!user) {
            return null; 
        }
        
        const passwordMatch = await bcrypt.compare(password_plano, user.password);
        
        if (!passwordMatch) {
            return null; // Contraseña incorrecta
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol }, 
            config.jwtSecret, 
            { expiresIn: '1h' }
        );
        
        return {
            token,
            user: { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre } as any
        };
    }
    
    public static async register(nombre: string, email: string, password_plano: string, rol: 'admin' | 'user'): Promise<Usuario> {
        
        const existing = await Usuario.findOne({ where: { email } });
        if (existing) {
            throw new Error(`Email duplicado: El correo ${email} ya está registrado.`);
        }

        const hashedPassword = await bcrypt.hash(password_plano, SALT_ROUNDS);
        
        const newUser = Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rol: rol,
        });
        
        return newUser.save();
    }
}
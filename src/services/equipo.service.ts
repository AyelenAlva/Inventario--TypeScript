import { Equipo } from '../entities/Equipo';
import { Usuario } from '../entities/Usuario';
import { TipoEquipo } from '../entities/TipoEquipo';
import { Ubicacion } from '../entities/Ubicacion';
import { AppDataSource } from '../db/connection';

export class EquipoService {
    
    private static equipoRepo = AppDataSource.getRepository(Equipo);
    private static tipoRepo = AppDataSource.getRepository(TipoEquipo);
    private static ubicacionRepo = AppDataSource.getRepository(Ubicacion);
    private static userRepo = AppDataSource.getRepository(Usuario);
    
    private static relations = ['tipo', 'ubicacion', 'responsable'];

    
    public static async findAll(rol: 'admin' | 'user', userId: number): Promise<Equipo[]> {
        if (rol === 'admin') {
            return this.equipoRepo.find({ relations: this.relations });
        }
        return this.findByResponsible(userId);
    }

    public static async findOne(id: number): Promise<Equipo | null> {
        return this.equipoRepo.findOne({ where: { id }, relations: this.relations });
    }

    public static async create(data: any): Promise<Equipo> {
        
        const existing = await this.equipoRepo.findOne({ where: { serial: data.serial } });
        if (existing) {
            throw new Error(`Serial duplicado: El equipo con serial ${data.serial} ya existe.`);
        }
        
        const [tipo, ubicacion, responsable] = await Promise.all([
            this.tipoRepo.findOneBy({ id: data.tipoId }),
            this.ubicacionRepo.findOneBy({ id: data.ubicacionId }),
            data.responsableId ? this.userRepo.findOneBy({ id: data.responsableId }) : null,
        ]);

        if (!tipo || !ubicacion) {
            throw new Error('Tipo o Ubicación no encontrados.');
        }

        const nuevoEquipo = this.equipoRepo.create({
            ...data,
            tipo: tipo,
            ubicacion: ubicacion,
            responsable: responsable,
        });
        
        return this.equipoRepo.save(nuevoEquipo);
    }
    
    // ... Implementar update, delete, findByResponsible, etc.
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { TipoEquipo } from "./TipoEquipo";
import { Ubicacion } from "./Ubicacion";

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nombre: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column({ unique: true })
  numeroSerie: string;

  @Column({ default: "activo" })
  estado: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.equipos, { eager: true })
  responsable: Usuario;

  @ManyToOne(() => TipoEquipo, (tipo) => tipo.equipos, { eager: true })
  tipo: TipoEquipo;

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.equipos, { eager: true })
  ubicacion: Ubicacion;
}

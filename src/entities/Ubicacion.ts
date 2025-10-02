import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Equipo } from "./Equipo";

@Entity()
export class Ubicacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @OneToMany(() => Equipo, (equipo) => equipo.ubicacion)
  equipos: Equipo[];
}

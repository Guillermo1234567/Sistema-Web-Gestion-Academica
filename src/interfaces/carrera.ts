export interface Carrera {
    id_carrera?: number;
    id_facultad: number;
    nombre_carrera: string;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
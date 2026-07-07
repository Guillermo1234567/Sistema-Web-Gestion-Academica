export interface Aula {
    id_aula?: number;
    nombre_aula: string;
    capacidad: number;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
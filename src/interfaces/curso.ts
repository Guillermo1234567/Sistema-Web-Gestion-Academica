export interface Curso {
    id_curso?: number;
    id_docente: number;
    id_carrera: number;
    codigo_curso: string;
    nombre_curso: string;
    creditos: number;
    horas_semanales: number;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
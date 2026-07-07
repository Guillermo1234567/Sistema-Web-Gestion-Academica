export interface Matricula {
    id_matricula?: number;
    id_estudiante: number;
    id_periodo: number;
    fecha_matricula?: Date;
    estado: string;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
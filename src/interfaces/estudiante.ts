export interface Estudiante {
    id_estudiante?: number;
    id_usuario?: number;
    id_carrera: number;
    codigo_estudiante: string;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    telefono?: string;
    direccion?: string;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
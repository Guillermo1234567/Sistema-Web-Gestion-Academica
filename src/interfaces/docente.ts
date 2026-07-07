export interface Docente {
    id_docente?: number;
    id_usuario?: number;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    telefono?: string;
    direccion?: string;
    especialidad?: string;
    grado_academico?: string;
    costo_hora: number;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
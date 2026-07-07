export interface Rol {
    id_rol?: number;
    nombre_rol: string;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
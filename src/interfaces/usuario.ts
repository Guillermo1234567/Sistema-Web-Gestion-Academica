export interface Usuario {
    id_usuario?: number;
    username: string;
    correo: string;
    password_hash: string;
    id_rol: number;
    estado?: boolean;
    fecha_creacion?: Date;
    fecha_actualizacion?: Date | null;
}
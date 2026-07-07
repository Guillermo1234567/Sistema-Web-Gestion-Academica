import { pool } from '../config/database';

export const listarUsuarios = async () => {

    const result = await pool.query(
        'SELECT * FROM seguridad.fn_listar_usuarios()'
    );

    return result.rows;
};

export const obtenerUsuario = async (
    id: number
) => {

    const result = await pool.query(
        'SELECT * FROM seguridad.fn_obtener_usuario($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarUsuario = async (
    username: string,
    correo: string,
    password_hash: string,
    id_rol: number
) => {

    await pool.query(
        'CALL seguridad.sp_insertar_usuario($1,$2,$3,$4)',
        [
            username,
            correo,
            password_hash,
            id_rol
        ]
    );

    return {
        mensaje: 'Usuario registrado'
    };
};

export const actualizarUsuario = async (
    id: number,
    username: string,
    correo: string,
    password_hash: string,
    id_rol: number,
    estado: boolean
) => {

    await pool.query(
        'CALL seguridad.sp_actualizar_usuario($1,$2,$3,$4,$5,$6)',
        [
            id,
            username,
            correo,
            password_hash,
            id_rol,
            estado
        ]
    );

    return {
        mensaje: 'Usuario actualizado'
    };
};

export const eliminarUsuario = async (
    id: number
) => {

    await pool.query(
        'CALL seguridad.sp_eliminar_usuario($1)',
        [id]
    );

    return {
        mensaje: 'Usuario eliminado'
    };
};
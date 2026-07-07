import { pool } from '../config/database';

export const listarRoles = async () => {
    const result = await pool.query(
        'SELECT * FROM seguridad.fn_listar_roles()'
    );

    return result.rows;
};

export const obtenerRol = async (
    id: number
) => {

    const result = await pool.query(
        'SELECT * FROM seguridad.fn_obtener_rol($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarRol = async (
    nombre_rol: string
) => {

    await pool.query(
        'CALL seguridad.sp_insertar_rol($1)',
        [nombre_rol]
    );

    return {
        mensaje: 'Rol registrado'
    };
};

export const actualizarRol = async (
    id: number,
    nombre: string,
    estado: boolean
) => {

    await pool.query(
        'CALL seguridad.sp_actualizar_rol($1,$2,$3)',
        [id,nombre,estado]
    );

    return {
        mensaje:'Rol actualizado'
    };
};

export const eliminarRol = async (
    id:number
) => {

    await pool.query(
        'CALL seguridad.sp_eliminar_rol($1)',
        [id]
    );

    return {
        mensaje:'Rol eliminado'
    };
};
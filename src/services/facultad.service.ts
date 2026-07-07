import { pool } from '../config/database';

export const listarFacultades = async () => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_facultades()'
    );

    return result.rows;
};

export const obtenerFacultad = async (
    id: number
) => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_facultad($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarFacultad = async (
    nombre_facultad: string
) => {

    await pool.query(
        'CALL academico.sp_insertar_facultad($1)',
        [nombre_facultad]
    );

    return {
        mensaje: 'Facultad registrada'
    };
};

export const actualizarFacultad = async (
    id: number,
    nombre_facultad: string,
    estado: boolean
) => {

    await pool.query(
        'CALL academico.sp_actualizar_facultad($1,$2,$3)',
        [id, nombre_facultad, estado]
    );

    return {
        mensaje: 'Facultad actualizada'
    };
};

export const eliminarFacultad = async (
    id: number
) => {

    await pool.query(
        'CALL academico.sp_eliminar_facultad($1)',
        [id]
    );

    return {
        mensaje: 'Facultad eliminada'
    };
};
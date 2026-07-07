import { pool } from '../config/database';

export const listarCarreras = async () => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_carreras()'
    );

    return result.rows;
};

export const obtenerCarrera = async (
    id: number
) => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_carrera($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarCarrera = async (
    id_facultad: number,
    nombre_carrera: string
) => {

    await pool.query(
        'CALL academico.sp_insertar_carrera($1,$2)',
        [
            id_facultad,
            nombre_carrera
        ]
    );

    return {
        mensaje: 'Carrera registrada'
    };
};

export const actualizarCarrera = async (
    id: number,
    id_facultad: number,
    nombre_carrera: string,
    estado: boolean
) => {

    await pool.query(
        'CALL academico.sp_actualizar_carrera($1,$2,$3,$4)',
        [
            id,
            id_facultad,
            nombre_carrera,
            estado
        ]
    );

    return {
        mensaje: 'Carrera actualizada'
    };
};

export const eliminarCarrera = async (
    id: number
) => {

    await pool.query(
        'CALL academico.sp_eliminar_carrera($1)',
        [id]
    );

    return {
        mensaje: 'Carrera eliminada'
    };
};
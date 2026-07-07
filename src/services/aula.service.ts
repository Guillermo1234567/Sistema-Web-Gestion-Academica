import { pool } from '../config/database';

export const listarAulas = async () => {
    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_aulas()'
    );

    return result.rows;
};

export const obtenerAula = async (
    id: number
) => {
    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_aula($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarAula = async (
    nombre_aula: string,
    capacidad: number
) => {
    await pool.query(
        'CALL academico.sp_insertar_aula($1,$2)',
        [nombre_aula, capacidad]
    );

    return {
        mensaje: 'Aula registrada'
    };
};

export const actualizarAula = async (
    id: number,
    nombre_aula: string,
    capacidad: number,
    estado: boolean
) => {
    await pool.query(
        'CALL academico.sp_actualizar_aula($1,$2,$3,$4)',
        [id, nombre_aula, capacidad, estado]
    );

    return {
        mensaje: 'Aula actualizada'
    };
};

export const eliminarAula = async (
    id: number
) => {
    await pool.query(
        'CALL academico.sp_eliminar_aula($1)',
        [id]
    );

    return {
        mensaje: 'Aula eliminada'
    };
};
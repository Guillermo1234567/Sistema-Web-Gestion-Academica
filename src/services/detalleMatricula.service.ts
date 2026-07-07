import { pool } from '../config/database';

export const listarDetallesMatricula = async () => {
    const result = await pool.query(
        'SELECT * FROM matriculas.fn_listar_detalles_matricula()'
    );

    return result.rows;
};

export const obtenerDetalleMatricula = async (
    id: number
) => {
    const result = await pool.query(
        'SELECT * FROM matriculas.fn_obtener_detalle_matricula($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarDetalleMatricula = async (
    id_matricula: number,
    id_curso: number
) => {
    await pool.query(
        'CALL matriculas.sp_insertar_detalle_matricula($1,$2)',
        [
            id_matricula,
            id_curso
        ]
    );

    return {
        mensaje: 'Detalle de matrícula registrado'
    };
};

export const eliminarDetalleMatricula = async (
    id: number
) => {
    await pool.query(
        'CALL matriculas.sp_eliminar_detalle_matricula($1)',
        [id]
    );

    return {
        mensaje: 'Detalle de matrícula eliminado'
    };
};
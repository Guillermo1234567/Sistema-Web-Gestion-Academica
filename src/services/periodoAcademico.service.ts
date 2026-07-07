import { pool } from '../config/database';

export const listarPeriodos = async () => {
    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_periodos_academicos()'
    );

    return result.rows;
};

export const obtenerPeriodo = async (
    id: number
) => {
    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_periodo_academico($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarPeriodo = async (
    nombre_periodo: string,
    fecha_inicio: string,
    fecha_fin: string,
    estado: string
) => {
    await pool.query(
        'CALL academico.sp_insertar_periodo_academico($1,$2,$3,$4)',
        [
            nombre_periodo,
            fecha_inicio,
            fecha_fin,
            estado
        ]
    );

    return {
        mensaje: 'Periodo académico registrado'
    };
};

export const actualizarPeriodo = async (
    id: number,
    nombre_periodo: string,
    fecha_inicio: string,
    fecha_fin: string,
    estado: string
) => {
    await pool.query(
        'CALL academico.sp_actualizar_periodo_academico($1,$2,$3,$4,$5)',
        [
            id,
            nombre_periodo,
            fecha_inicio,
            fecha_fin,
            estado
        ]
    );

    return {
        mensaje: 'Periodo académico actualizado'
    };
};

export const eliminarPeriodo = async (
    id: number
) => {
    await pool.query(
        'CALL academico.sp_eliminar_periodo_academico($1)',
        [id]
    );

    return {
        mensaje: 'Periodo académico eliminado'
    };
};
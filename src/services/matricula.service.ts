import { pool } from '../config/database';

export const listarMatriculas = async () => {
    const result = await pool.query(
        'SELECT * FROM matriculas.fn_listar_matriculas()'
    );

    return result.rows;
};

export const obtenerMatricula = async (
    id: number
) => {
    const result = await pool.query(
        'SELECT * FROM matriculas.fn_obtener_matricula($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarMatricula = async (
    id_estudiante: number,
    id_periodo: number,
    estado: string
) => {
    await pool.query(
        'CALL matriculas.sp_insertar_matricula($1,$2,$3)',
        [
            id_estudiante,
            id_periodo,
            estado
        ]
    );

    return {
        mensaje: 'Matrícula registrada'
    };
};

export const actualizarMatricula = async (
    id: number,
    id_estudiante: number,
    id_periodo: number,
    estado: string
) => {
    await pool.query(
        'CALL matriculas.sp_actualizar_matricula($1,$2,$3,$4)',
        [
            id,
            id_estudiante,
            id_periodo,
            estado
        ]
    );

    return {
        mensaje: 'Matrícula actualizada'
    };
};

export const eliminarMatricula = async (
    id: number
) => {
    await pool.query(
        'CALL matriculas.sp_eliminar_matricula($1)',
        [id]
    );

    return {
        mensaje: 'Matrícula eliminada'
    };
};
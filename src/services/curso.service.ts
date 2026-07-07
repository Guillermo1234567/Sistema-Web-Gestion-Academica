import { pool } from '../config/database';

export const listarCursos = async () => {
    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_cursos()'
    );

    return result.rows;
};

export const obtenerCurso = async (
    id: number
) => {
    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_curso($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarCurso = async (
    id_docente: number,
    id_carrera: number,
    codigo_curso: string,
    nombre_curso: string,
    creditos: number,
    horas_semanales: number
) => {
    await pool.query(
        'CALL academico.sp_insertar_curso($1,$2,$3,$4,$5,$6)',
        [
            id_docente,
            id_carrera,
            codigo_curso,
            nombre_curso,
            creditos,
            horas_semanales
        ]
    );

    return {
        mensaje: 'Curso registrado'
    };
};

export const actualizarCurso = async (
    id: number,
    id_docente: number,
    id_carrera: number,
    codigo_curso: string,
    nombre_curso: string,
    creditos: number,
    horas_semanales: number,
    estado: boolean
) => {
    await pool.query(
        'CALL academico.sp_actualizar_curso($1,$2,$3,$4,$5,$6,$7,$8)',
        [
            id,
            id_docente,
            id_carrera,
            codigo_curso,
            nombre_curso,
            creditos,
            horas_semanales,
            estado
        ]
    );

    return {
        mensaje: 'Curso actualizado'
    };
};

export const eliminarCurso = async (
    id: number
) => {
    await pool.query(
        'CALL academico.sp_eliminar_curso($1)',
        [id]
    );

    return {
        mensaje: 'Curso eliminado'
    };
};
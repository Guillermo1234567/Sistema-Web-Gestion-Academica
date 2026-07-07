import { pool } from '../config/database';

export const listarEstudiantes = async () => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_estudiantes()'
    );

    return result.rows;
};

export const obtenerEstudiante = async (
    id: number
) => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_estudiante($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarEstudiante = async (
    id_usuario: number | null,
    id_carrera: number,
    codigo_estudiante: string,
    numero_documento: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    direccion: string
) => {

    await pool.query(
        'CALL academico.sp_insertar_estudiante($1,$2,$3,$4,$5,$6,$7,$8)',
        [
            id_usuario,
            id_carrera,
            codigo_estudiante,
            numero_documento,
            nombres,
            apellidos,
            telefono,
            direccion
        ]
    );

    return {
        mensaje: 'Estudiante registrado'
    };
};

export const actualizarEstudiante = async (
    id: number,
    id_usuario: number | null,
    id_carrera: number,
    codigo_estudiante: string,
    numero_documento: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    direccion: string,
    estado: boolean
) => {

    await pool.query(
        'CALL academico.sp_actualizar_estudiante($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [
            id,
            id_usuario,
            id_carrera,
            codigo_estudiante,
            numero_documento,
            nombres,
            apellidos,
            telefono,
            direccion,
            estado
        ]
    );

    return {
        mensaje: 'Estudiante actualizado'
    };
};

export const eliminarEstudiante = async (
    id: number
) => {

    await pool.query(
        'CALL academico.sp_eliminar_estudiante($1)',
        [id]
    );

    return {
        mensaje: 'Estudiante eliminado'
    };
};
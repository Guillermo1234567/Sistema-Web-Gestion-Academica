import { pool } from '../config/database';

export const listarDocentes = async () => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_docentes()'
    );

    return result.rows;
};

export const obtenerDocente = async (
    id: number
) => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_docente($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarDocente = async (
    id_usuario: number,
    numero_documento: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    direccion: string,
    especialidad: string,
    grado_academico: string,
    costo_hora: number
) => {

    await pool.query(
        'CALL academico.sp_insertar_docente($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [
            id_usuario,
            numero_documento,
            nombres,
            apellidos,
            telefono,
            direccion,
            especialidad,
            grado_academico,
            costo_hora
        ]
    );

    return {
        mensaje: 'Docente registrado'
    };
};

export const actualizarDocente = async (
    id: number,
    telefono: string,
    direccion: string,
    especialidad: string,
    grado_academico: string,
    costo_hora: number,
    estado: boolean
) => {

    await pool.query(
        'CALL academico.sp_actualizar_docente($1,$2,$3,$4,$5,$6,$7)',
        [
            id,
            telefono,
            direccion,
            especialidad,
            grado_academico,
            costo_hora,
            estado
        ]
    );

    return {
        mensaje: 'Docente actualizado'
    };
};

export const eliminarDocente = async (
    id: number
) => {

    await pool.query(
        'CALL academico.sp_eliminar_docente($1)',
        [id]
    );

    return {
        mensaje: 'Docente eliminado'
    };
};
import { pool } from '../config/database';

export const listarHorarios = async () => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_listar_horarios()'
    );

    return result.rows;
};

export const obtenerHorario = async (
    id: number
) => {

    const result = await pool.query(
        'SELECT * FROM academico.fn_obtener_horario($1)',
        [id]
    );

    return result.rows[0];
};

export const insertarHorario = async (
    id_curso: number,
    id_aula: number,
    dia_semana: string,
    hora_inicio: string,
    hora_fin: string
) => {

    await pool.query(
        'CALL academico.sp_insertar_horario($1,$2,$3,$4,$5)',
        [
            id_curso,
            id_aula,
            dia_semana,
            hora_inicio,
            hora_fin
        ]
    );

    return {
        mensaje: 'Horario registrado'
    };
};

export const actualizarHorario = async (
    id: number,
    id_curso: number,
    id_aula: number,
    dia_semana: string,
    hora_inicio: string,
    hora_fin: string,
    estado: boolean
) => {

    await pool.query(
        'CALL academico.sp_actualizar_horario($1,$2,$3,$4,$5,$6,$7)',
        [
            id,
            id_curso,
            id_aula,
            dia_semana,
            hora_inicio,
            hora_fin,
            estado
        ]
    );

    return {
        mensaje: 'Horario actualizado'
    };
};

export const eliminarHorario = async (
    id: number
) => {

    await pool.query(
        'CALL academico.sp_eliminar_horario($1)',
        [id]
    );

    return {
        mensaje: 'Horario eliminado'
    };
};
import { Request, Response } from 'express';
import * as horarioService from '../services/horario.service';

export const getHorarios = async (
    req: Request,
    res: Response
) => {

    const data =
        await horarioService.listarHorarios();

    res.json(data);
};

export const getHorarioById = async (
    req: Request,
    res: Response
) => {

    const horario =
        await horarioService.obtenerHorario(
            Number(req.params.id)
        );

    res.json(horario);
};

export const createHorario = async (
    req: Request,
    res: Response
) => {

    const result =
        await horarioService.insertarHorario(
            req.body.id_curso,
            req.body.id_aula,
            req.body.dia_semana,
            req.body.hora_inicio,
            req.body.hora_fin
        );

    res.json(result);
};

export const updateHorario = async (
    req: Request,
    res: Response
) => {

    const result =
        await horarioService.actualizarHorario(
            Number(req.params.id),
            req.body.id_curso,
            req.body.id_aula,
            req.body.dia_semana,
            req.body.hora_inicio,
            req.body.hora_fin,
            req.body.estado
        );

    res.json(result);
};

export const deleteHorario = async (
    req: Request,
    res: Response
) => {

    const result =
        await horarioService.eliminarHorario(
            Number(req.params.id)
        );

    res.json(result);
};
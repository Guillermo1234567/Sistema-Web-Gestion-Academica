import { Request, Response } from 'express';
import * as periodoService from '../services/periodoAcademico.service';

export const getPeriodos = async (
    req: Request,
    res: Response
) => {
    const data =
        await periodoService.listarPeriodos();

    res.json(data);
};

export const getPeriodoById = async (
    req: Request,
    res: Response
) => {
    const periodo =
        await periodoService.obtenerPeriodo(
            Number(req.params.id)
        );

    res.json(periodo);
};

export const createPeriodo = async (
    req: Request,
    res: Response
) => {
    const result =
        await periodoService.insertarPeriodo(
            req.body.nombre_periodo,
            req.body.fecha_inicio,
            req.body.fecha_fin,
            req.body.estado
        );

    res.json(result);
};

export const updatePeriodo = async (
    req: Request,
    res: Response
) => {
    const result =
        await periodoService.actualizarPeriodo(
            Number(req.params.id),
            req.body.nombre_periodo,
            req.body.fecha_inicio,
            req.body.fecha_fin,
            req.body.estado
        );

    res.json(result);
};

export const deletePeriodo = async (
    req: Request,
    res: Response
) => {
    const result =
        await periodoService.eliminarPeriodo(
            Number(req.params.id)
        );

    res.json(result);
};
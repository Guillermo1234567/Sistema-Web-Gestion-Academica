import { Request, Response } from 'express';
import * as aulaService from '../services/aula.service';

export const getAulas = async (
    req: Request,
    res: Response
) => {
    const data =
        await aulaService.listarAulas();

    res.json(data);
};

export const getAulaById = async (
    req: Request,
    res: Response
) => {
    const aula =
        await aulaService.obtenerAula(
            Number(req.params.id)
        );

    res.json(aula);
};

export const createAula = async (
    req: Request,
    res: Response
) => {
    const result =
        await aulaService.insertarAula(
            req.body.nombre_aula,
            req.body.capacidad
        );

    res.json(result);
};

export const updateAula = async (
    req: Request,
    res: Response
) => {
    const result =
        await aulaService.actualizarAula(
            Number(req.params.id),
            req.body.nombre_aula,
            req.body.capacidad,
            req.body.estado
        );

    res.json(result);
};

export const deleteAula = async (
    req: Request,
    res: Response
) => {
    const result =
        await aulaService.eliminarAula(
            Number(req.params.id)
        );

    res.json(result);
};
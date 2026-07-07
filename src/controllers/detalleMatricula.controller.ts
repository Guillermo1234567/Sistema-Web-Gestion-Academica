import { Request, Response } from 'express';
import * as detalleService from '../services/detalleMatricula.service';

export const getDetallesMatricula = async (
    req: Request,
    res: Response
) => {
    const data =
        await detalleService.listarDetallesMatricula();

    res.json(data);
};

export const getDetalleMatriculaById = async (
    req: Request,
    res: Response
) => {
    const detalle =
        await detalleService.obtenerDetalleMatricula(
            Number(req.params.id)
        );

    res.json(detalle);
};

export const createDetalleMatricula = async (
    req: Request,
    res: Response
) => {
    const result =
        await detalleService.insertarDetalleMatricula(
            req.body.id_matricula,
            req.body.id_curso
        );

    res.json(result);
};

export const deleteDetalleMatricula = async (
    req: Request,
    res: Response
) => {
    const result =
        await detalleService.eliminarDetalleMatricula(
            Number(req.params.id)
        );

    res.json(result);
};
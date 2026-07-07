import { Request, Response } from 'express';
import * as matriculaService from '../services/matricula.service';

export const getMatriculas = async (
    req: Request,
    res: Response
) => {
    const data =
        await matriculaService.listarMatriculas();

    res.json(data);
};

export const getMatriculaById = async (
    req: Request,
    res: Response
) => {
    const matricula =
        await matriculaService.obtenerMatricula(
            Number(req.params.id)
        );

    res.json(matricula);
};

export const createMatricula = async (
    req: Request,
    res: Response
) => {
    const result =
        await matriculaService.insertarMatricula(
            req.body.id_estudiante,
            req.body.id_periodo,
            req.body.estado
        );

    res.json(result);
};

export const updateMatricula = async (
    req: Request,
    res: Response
) => {
    const result =
        await matriculaService.actualizarMatricula(
            Number(req.params.id),
            req.body.id_estudiante,
            req.body.id_periodo,
            req.body.estado
        );

    res.json(result);
};

export const deleteMatricula = async (
    req: Request,
    res: Response
) => {
    const result =
        await matriculaService.eliminarMatricula(
            Number(req.params.id)
        );

    res.json(result);
};
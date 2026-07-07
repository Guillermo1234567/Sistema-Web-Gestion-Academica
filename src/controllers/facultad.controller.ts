import { Request, Response } from 'express';
import * as facultadService from '../services/facultad.service';

export const getFacultades = async (
    req: Request,
    res: Response
) => {

    const data =
        await facultadService.listarFacultades();

    res.json(data);
};

export const getFacultadById = async (
    req: Request,
    res: Response
) => {

    const facultad =
        await facultadService.obtenerFacultad(
            Number(req.params.id)
        );

    res.json(facultad);
};

export const createFacultad = async (
    req: Request,
    res: Response
) => {

    const result =
        await facultadService.insertarFacultad(
            req.body.nombre_facultad
        );

    res.json(result);
};

export const updateFacultad = async (
    req: Request,
    res: Response
) => {

    const result =
        await facultadService.actualizarFacultad(
            Number(req.params.id),
            req.body.nombre_facultad,
            req.body.estado
        );

    res.json(result);
};

export const deleteFacultad = async (
    req: Request,
    res: Response
) => {

    const result =
        await facultadService.eliminarFacultad(
            Number(req.params.id)
        );

    res.json(result);
};
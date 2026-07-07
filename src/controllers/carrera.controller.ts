import { Request, Response } from 'express';
import * as carreraService from '../services/carrera.service';

export const getCarreras = async (
    req: Request,
    res: Response
) => {

    const data =
        await carreraService.listarCarreras();

    res.json(data);
};

export const getCarreraById = async (
    req: Request,
    res: Response
) => {

    const carrera =
        await carreraService.obtenerCarrera(
            Number(req.params.id)
        );

    res.json(carrera);
};

export const createCarrera = async (
    req: Request,
    res: Response
) => {

    const result =
        await carreraService.insertarCarrera(
            req.body.id_facultad,
            req.body.nombre_carrera
        );

    res.json(result);
};

export const updateCarrera = async (
    req: Request,
    res: Response
) => {

    const result =
        await carreraService.actualizarCarrera(
            Number(req.params.id),
            req.body.id_facultad,
            req.body.nombre_carrera,
            req.body.estado
        );

    res.json(result);
};

export const deleteCarrera = async (
    req: Request,
    res: Response
) => {

    const result =
        await carreraService.eliminarCarrera(
            Number(req.params.id)
        );

    res.json(result);
};
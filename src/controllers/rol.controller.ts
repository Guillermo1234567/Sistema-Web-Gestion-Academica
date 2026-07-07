import { Request, Response } from 'express';
import * as rolService from '../services/rol.service';

export const getRoles = async (
    req: Request,
    res: Response
) => {

    const data =
        await rolService.listarRoles();

    res.json(data);
};

export const getRolById = async (
    req: Request,
    res: Response
) => {

    const id = Number(req.params.id);

    const rol = await rolService.obtenerRol(id);

    res.json(rol);
};

export const createRol = async (
    req: Request,
    res: Response
) => {

    const result =
        await rolService.insertarRol(
            req.body.nombre_rol
        );

    res.json(result);
};

export const updateRol = async (
    req: Request,
    res: Response
) => {

    const result =
        await rolService.actualizarRol(
            Number(req.params.id),
            req.body.nombre_rol,
            req.body.estado
        );

    res.json(result);
};

export const deleteRol = async (
    req: Request,
    res: Response
) => {

    const result =
        await rolService.eliminarRol(
            Number(req.params.id)
        );

    res.json(result);
};
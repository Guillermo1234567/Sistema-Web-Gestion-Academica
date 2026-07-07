import { Request, Response } from 'express';
import * as estudianteService from '../services/estudiante.service';

export const getEstudiantes = async (
    req: Request,
    res: Response
) => {

    const data =
        await estudianteService.listarEstudiantes();

    res.json(data);
};

export const getEstudianteById = async (
    req: Request,
    res: Response
) => {

    const estudiante =
        await estudianteService.obtenerEstudiante(
            Number(req.params.id)
        );

    res.json(estudiante);
};

export const createEstudiante = async (
    req: Request,
    res: Response
) => {

    const result =
        await estudianteService.insertarEstudiante(
            req.body.id_usuario,
            req.body.id_carrera,
            req.body.codigo_estudiante,
            req.body.numero_documento,
            req.body.nombres,
            req.body.apellidos,
            req.body.telefono,
            req.body.direccion
        );

    res.json(result);
};

export const updateEstudiante = async (
    req: Request,
    res: Response
) => {

    const result =
        await estudianteService.actualizarEstudiante(
            Number(req.params.id),
            req.body.id_usuario,
            req.body.id_carrera,
            req.body.codigo_estudiante,
            req.body.numero_documento,
            req.body.nombres,
            req.body.apellidos,
            req.body.telefono,
            req.body.direccion,
            req.body.estado
        );

    res.json(result);
};

export const deleteEstudiante = async (
    req: Request,
    res: Response
) => {

    const result =
        await estudianteService.eliminarEstudiante(
            Number(req.params.id)
        );

    res.json(result);
};
import { Request, Response } from 'express';
import * as docenteService from '../services/docente.service';

export const getDocentes = async (
    req: Request,
    res: Response
) => {

    const data =
        await docenteService.listarDocentes();

    res.json(data);
};

export const getDocenteById = async (
    req: Request,
    res: Response
) => {

    const docente =
        await docenteService.obtenerDocente(
            Number(req.params.id)
        );

    res.json(docente);
};

export const createDocente = async (
    req: Request,
    res: Response
) => {

    const result =
        await docenteService.insertarDocente(
            req.body.id_usuario,
            req.body.numero_documento,
            req.body.nombres,
            req.body.apellidos,
            req.body.telefono,
            req.body.direccion,
            req.body.especialidad,
            req.body.grado_academico,
            req.body.costo_hora
        );

    res.json(result);
};

export const updateDocente = async (
    req: Request,
    res: Response
) => {

    const result =
        await docenteService.actualizarDocente(
            Number(req.params.id),
            req.body.telefono,
            req.body.direccion,
            req.body.especialidad,
            req.body.grado_academico,
            req.body.costo_hora,
            req.body.estado
        );

    res.json(result);
};

export const deleteDocente = async (
    req: Request,
    res: Response
) => {

    const result =
        await docenteService.eliminarDocente(
            Number(req.params.id)
        );

    res.json(result);
};
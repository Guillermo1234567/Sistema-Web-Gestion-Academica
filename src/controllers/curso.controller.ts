import { Request, Response } from 'express';
import * as cursoService from '../services/curso.service';

export const getCursos = async (
    req: Request,
    res: Response
) => {
    const data =
        await cursoService.listarCursos();

    res.json(data);
};

export const getCursoById = async (
    req: Request,
    res: Response
) => {
    const curso =
        await cursoService.obtenerCurso(
            Number(req.params.id)
        );

    res.json(curso);
};

export const createCurso = async (
    req: Request,
    res: Response
) => {
    const result =
        await cursoService.insertarCurso(
            req.body.id_docente,
            req.body.id_carrera,
            req.body.codigo_curso,
            req.body.nombre_curso,
            req.body.creditos,
            req.body.horas_semanales
        );

    res.json(result);
};

export const updateCurso = async (
    req: Request,
    res: Response
) => {
    const result =
        await cursoService.actualizarCurso(
            Number(req.params.id),
            req.body.id_docente,
            req.body.id_carrera,
            req.body.codigo_curso,
            req.body.nombre_curso,
            req.body.creditos,
            req.body.horas_semanales,
            req.body.estado
        );

    res.json(result);
};

export const deleteCurso = async (
    req: Request,
    res: Response
) => {
    const result =
        await cursoService.eliminarCurso(
            Number(req.params.id)
        );

    res.json(result);
};
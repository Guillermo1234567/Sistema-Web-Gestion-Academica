import { Request, Response } from 'express';
import * as usuarioService from '../services/usuario.service';

export const getUsuarios = async (
    req: Request,
    res: Response
) => {

    const data =
        await usuarioService.listarUsuarios();

    res.json(data);
};

export const getUsuarioById = async (
    req: Request,
    res: Response
) => {

    const id = Number(req.params.id);

    const usuario =
        await usuarioService.obtenerUsuario(id);

    res.json(usuario);
};

export const createUsuario = async (
    req: Request,
    res: Response
) => {

    const result =
        await usuarioService.insertarUsuario(
            req.body.username,
            req.body.correo,
            req.body.password_hash,
            req.body.id_rol
        );

    res.json(result);
};

export const updateUsuario = async (
    req: Request,
    res: Response
) => {

    const result =
        await usuarioService.actualizarUsuario(
            Number(req.params.id),
            req.body.username,
            req.body.correo,
            req.body.password_hash,
            req.body.id_rol,
            req.body.estado
        );

    res.json(result);
};

export const deleteUsuario = async (
    req: Request,
    res: Response
) => {

    const result =
        await usuarioService.eliminarUsuario(
            Number(req.params.id)
        );

    res.json(result);
};
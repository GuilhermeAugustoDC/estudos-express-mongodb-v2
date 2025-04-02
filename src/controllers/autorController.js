import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      next(error);
    }
  }

  static async listaAutoresByID(req, res, next) {
    try {
      const autorEncontrado = await autor.findById(req.params.id);
      if (autorEncontrado !== null) {
        res.status(200).send(autorEncontrado);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res
        .status(201)
        .json({ msg: "Autor Cadastrado com sucesso", autor: novoAutor });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      await autor.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      await autor.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Autor excluido com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
export default AutorController;

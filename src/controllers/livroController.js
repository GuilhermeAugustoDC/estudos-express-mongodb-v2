//! FUNÇÃO CONTROLLER PARA LIVRO

import NotFound from "../erros/notFound.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroByID(req, res, next) {
    try {
      const livroEncontrado = await livro
        .findById(req.params.id)
        .populate("autor", "nome")
        .exec();
      if (livroEncontrado !== null) {
        res.status(200).send(livroEncontrado);
      } else {
        next(new NotFound("ID do livro não localizado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: autorEncontrado };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ msg: "Livro criado com sucesso", livro: livroCriado });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const livroResultado = await livro.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const livroResultado = await livro.findByIdAndDelete(req.params.id);
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;

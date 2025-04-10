//! FUNÇÃO CONTROLLER PARA LIVRO

import { populate } from "dotenv";
import NotFound from "../erros/notFound.js";
import { autor, autor, autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
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

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosPorEditora = livro.find(busca).populate("autor");
        req.resultado = livrosPorEditora;
        res.status(200).json(livrosPorEditora);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  }
}

async function processaBusca(param) {
  const { editora, titulo, minPgs, maxPgs, nomeAutor } = param;
  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPgs || maxPgs) busca.numeroPaginas = {};
  if (minPgs) busca.numeroPaginas.$gte = minPgs;
  if (maxPgs) busca.numeroPaginas.$lte = maxPgs;

  if (nomeAutor) {
    const autores = await autor.findOne({ nome: nomeAutor });

    if (autores !== null) {
      busca.autores = autores._id;
    }
  }

  return busca;
}

export default LivroController;

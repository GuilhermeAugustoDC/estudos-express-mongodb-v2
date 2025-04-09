//! Controllers - Responsavel por definir o que AutorController vai fazer.

import NotFound from "../erros/notFound.js";
import { autor } from "../models/index.js";
// (Modelo De Organização de Daddos)

// Classe AutorController
class AutorController {
  //Autor Controller Metodos - É responsavel realizar as ações de Autores, como:
  // * Listar Autores - Listar Autores Por ID - Cadastrar Autor -
  // * Atualizar Autor - Excluir Autor

  static async listarAutores(req, res, next) {
    // * Lista todos os autores.
    // Faz uma requisição GET na rota /autores
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      next(error);
    }
  }

  static async listaAutoresByID(req, res, next) {
    // * Lista autores por ID.
    // Faz uma requisição GET na rota /autores/:id
    try {
      const autorEncontrado = await autor.findById(req.params.id);
      if (autorEncontrado !== null) {
        res.status(200).send(autorEncontrado);
      } else {
        next(new NotFound("Id do Autor não localizado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor(req, res, next) {
    // * Cadastra um novo autor.
    // Faz uma requisição POST na rota /autores
    // Informações da req no body da requisição em json.
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
    // * Atualiza os dados de um autor.
    // Faz uma requisição PUT na rota /autores/:id
    // Informações da req no body da requisição em json.

    try {
      const autorResultado = await autor.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NotFound("ID do autor não localizado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async excluirAutor(req, res, next) {
    // * Exclui um autor.
    // Faz uma requisição DELETE na rota /autores/:id
    // Informações da req no body da requisição em json.
    try {
      const autorResultado = await autor.findByIdAndDelete(req.params.id);
      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor excluido com sucesso" });
      } else {
        next(new NotFound("ID do autor não localizado"));
      }
    } catch (error) {
      next(error);
    }
  }
}
export default AutorController; // Exporta

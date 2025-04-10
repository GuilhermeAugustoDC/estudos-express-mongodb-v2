import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes
  .get("/livros", LivroController.listarLivros, paginar)
  .get("/livros/busca", LivroController.listarLivrosPorFiltro, paginar)
  .get("/livros/:id", LivroController.listarLivroByID)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

export default routes;

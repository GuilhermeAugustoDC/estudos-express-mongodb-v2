//! Responsavel por fazer a conexão com o Banco de dados
//? Esse arquivo é importado em src/app.js

import mongoose from "mongoose"; // importaçao da biblioteca mongoose usar com MongoDB

async function connect_db(params) {
  mongoose.connect(process.env.DB_CONNECTION_STRING); // Configuração com .env dado sensilvel.
  return mongoose.connection; // Retorno a conexão com o banco
}

export default connect_db; // Export da função.


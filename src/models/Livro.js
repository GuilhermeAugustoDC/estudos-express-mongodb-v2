import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    titulo: {
      type: String,
      required: [true, "O Titulo do Livro é um campo OBRIGATÓRIO"],
    },
    editora: {
      type: String,
      required: [true, "Editora do Livro é um campo OBRIGATÓRIO"],
    },
    preco: {
      type: Number,
    },
    paginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 3000;
        },
        message:
          "O numero de paginas deve estar entre 10 e 3000. Valor fornecido {VALUE}",
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor(a) é um campo OBRIGATÓRIO"],
    },
  },
  {
    versionKey: false,
  }
);

const livro = mongoose.model("livros", livroSchema);
export default livro;

import mongoose from "mongoose";

function errorManager(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "Um ou mais dados fornecidos estão incorretos." });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const mensagensErros = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    res.status(400).send({
      message: `Os seguintes erros foram encontrados: ${mensagensErros}`,
    });
  } else {
    res.status(500).send({ message: "Erro interno de servidor." });
  }
}
export default errorManager;

import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import BadRequest from "../erros/erroBadReq.js";
import ErroValidation from "../erros/erroValidation.js";

function errorManager(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new BadRequest().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErroValidation(error).enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}
export default errorManager;

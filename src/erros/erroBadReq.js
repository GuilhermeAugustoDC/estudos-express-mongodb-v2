import ErroBase from "./erroBase.js";

class BadRequest extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos.") {
    super(mensagem, 400);
  }
}

export default BadRequest;

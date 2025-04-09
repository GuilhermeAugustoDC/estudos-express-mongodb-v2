import BadRequest from "./erroBadReq.js";

class ErroValidation extends BadRequest {
  constructor(error) {
    const mensagensErros = Object.values(error.errors)
      .map((error) => error.message)
      .join(";");

    super(`Os seguintes erros foram encontrados: ${mensagensErros}`);
  }
}

export default ErroValidation;

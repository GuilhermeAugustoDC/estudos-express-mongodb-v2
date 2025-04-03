import ErroBase from "./erroBase.js";

class ErroValidation extends ErroBase {
  constructor(error) {
    const mensagensErros = Object.values(error.errors)
      .map((error) => error.message)
      .join(";");

    super(`Os seguintes erros foram encontrados: ${mensagensErros}`);
  }
}

export default ErroValidation;

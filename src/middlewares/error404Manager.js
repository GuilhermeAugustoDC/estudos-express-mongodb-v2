import NotFound from "../erros/notFound.js";

function error404Manager(req, res, next) {
  const error404 = new NotFound();
  next(error404);
}

export default error404Manager;

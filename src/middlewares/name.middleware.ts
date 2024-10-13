import { Request, Response, NextFunction } from 'express'; // Importa os tipos Request, Response e NextFunction do Express

// Middleware para validar o campo 'name' em uma solicitação
const nameValidator = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body; // Extrai o campo 'name' do corpo da requisição

  // Verifica se o campo 'name' está ausente na requisição
  if (!name) {
    return res.status(400).json({ message: '"name" is required' }); // Retorna um status 400 (Bad Request) com uma mensagem de erro
  }

  // Verifica se o campo 'name' não é uma string
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' }); // Retorna um status 422 (Unprocessable Entity) com uma mensagem de erro
  }

  // Verifica se o campo 'name' tem menos de 3 caracteres
  if (name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' }); // Retorna um status 422 (Unprocessable Entity) com uma mensagem de erro
  }

  next(); // Chama a próxima função de middleware na pilha de middleware
};

// Exporta o middleware de validação de nome
export default { nameValidator };

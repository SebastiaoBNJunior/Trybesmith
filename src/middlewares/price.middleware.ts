import { Request, Response, NextFunction } from 'express'; // Importa os tipos Request, Response e NextFunction do Express
import ProductModel from '../database/models/product.model'; // Importa o modelo do produto

// Middleware para validar a primeira parte da requisição
const firstPart = (req: Request, res: Response, next: NextFunction) => {
  const { price } = req.body; // Extrai o campo 'price' do corpo da requisição

  // Verifica se o campo 'price' está ausente na requisição
  if (!price) {
    return res.status(400).json({ message: '"price" is required' }); // Retorna um status 400 (Bad Request) com uma mensagem de erro
  }

  // Verifica se o campo 'price' não é uma string
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' }); // Retorna um status 422 (Unprocessable Entity) com uma mensagem de erro
  }

  // Verifica se o campo 'price' tem menos de 3 caracteres
  if (price.length < 3) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' }); // Retorna um status 422 (Unprocessable Entity) com uma mensagem de erro
  }

  next(); // Chama a próxima função de middleware na pilha de middleware
};

// Middleware para validar o campo 'userId' na requisição
const userIdValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body; // Extrai o campo 'userId' do corpo da requisição

  // Verifica se o campo 'userId' está ausente na requisição
  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' }); // Retorna um status 400 (Bad Request) com uma mensagem de erro
  }

  // Verifica se o campo 'userId' não é um número
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' }); // Retorna um status 422 (Unprocessable Entity) com uma mensagem de erro
  }

  // Verifica se o usuário existe no banco de dados
  try {
    const product = await ProductModel.findOne({ where: { userId } }); // Procura um produto com o userId fornecido
    if (!product) {
      return res.status(422).json({ message: '"userId" not found' }); // Retorna um status 422 (Unprocessable Entity) com uma mensagem de erro se o usuário não for encontrado
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' }); // Retorna um status 500 (Internal Server Error) se ocorrer um erro durante a consulta ao banco de dados
  }

  next(); // Chama a próxima função de middleware na pilha de middleware
};

// Exporta os middlewares de validação da primeira parte e do campo 'userId'
export default { firstPart, userIdValidator };

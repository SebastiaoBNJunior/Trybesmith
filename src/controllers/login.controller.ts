import { Request, Response } from 'express'; // Importa os tipos Request e Response do Express
import loginService from '../services/login.service'; // Importa o serviço de login

// Controlador de login assíncrono que recebe uma solicitação (req) e uma resposta (res)
const loginController = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { username, password } = req.body; // Extrai o nome de usuário e senha do corpo da requisição
  try {
    // Chama o serviço de login para autenticar o usuário e obter um token
    const token: string = await loginService.login(username, password);
    // Retorna um status 200 (OK) e o token em formato JSON
    return res.status(200).json({ token });
  } catch (e: any) {
    // Captura erros lançados pelo serviço de login
    if (e.message === 'Username or password invalid') {
      // Retorna um status 401 (Unauthorized) se o nome de usuário ou senha forem inválidos
      return res.status(401).json({ message: e.message });
    }
    // Retorna um status 400 (Bad Request) para outros erros
    return res.status(400).json({ message: e.message });
  }
};

export default { loginController }; // Exporta o controlador de login

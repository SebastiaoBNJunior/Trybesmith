import express from 'express'; // Importa o framework Express.js
import productsRouter from './routes/productsRouter'; // Importa o roteador de produtos
import usersRouter from './routes/usersRouter'; // Importa o roteador de usuários
import loginRouter from './routes/loginRouter'; // Importa o roteador de login

const app = express(); // Cria uma instância do aplicativo Express

// Rota de verificação de saúde do servidor
app.get('/health', (_req, res) => {
  res.status(201).json({ message: 'Server up, brother! 🚀' });
});

app.use(express.json()); // Middleware para analisar corpos de requisição JSON

// Monta os roteadores no aplicativo Express
app.use(usersRouter); // Usa o roteador de usuários
app.use(loginRouter); // Usa o roteador de login
app.use(productsRouter); // Usa o roteador de produtos

export default app; // Exporta o aplicativo Express

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

const generateToken = (username: string): string =>
  jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

const login = async (username: string, password: string): Promise<string> => {
  if (!username || !password) throw new Error('"username" and "password" are required');

  const user: UserSequelizeModel | null = await UserModel.findOne({ where: { username } });

  if (
    !user
    || !bcrypt.compareSync(password, user.dataValues.password)
  ) throw new Error('Username or password invalid');

  return generateToken(username);
};

export default { login };
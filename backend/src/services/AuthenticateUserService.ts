import User from "../models/User";
import { getRepository } from 'typeorm'
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User,
  token: String
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination.')
    }

    //user.password - Senha criptografada
    // password - Senha nao cript

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    const { secret, expireIn } = authConfig.jwt

    const token = sign(
      {},
      secret,
      {
        subject: user.id,
        expiresIn: expireIn
      })//1° parametro payload, dentro do token porém não seguro, 2° chave secreta 3° configurações

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;

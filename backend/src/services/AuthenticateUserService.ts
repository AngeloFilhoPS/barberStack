import User from "../models/User";
import { getRepository } from 'typeorm'
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request{
  email: string;
  password: string;
}
interface Response{
  user: User,
  token: String
}

class AuthenticateUserService{
  public async execute({email, password}:Request): Promise<Response>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where:{email}})

    if(!user){
      throw new Error('Incorrect email/password combination.')
    }

    //user.password - Senha criptografada
    // password - Senha nao cript

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched){
      throw new Error('Incorrect email/password combination.')
    }

    const token = sign(
      {},
      '53adbbe5567100fc0469fc36d01b7ab9',
      {subject:user.id,
        expiresIn:'1d'
      })//1° parametro payload, dentro do token porém não seguro, 2° chave secreta 3° configurações

    return{
      user,
      token
    }
  }
}

export default AuthenticateUserService;

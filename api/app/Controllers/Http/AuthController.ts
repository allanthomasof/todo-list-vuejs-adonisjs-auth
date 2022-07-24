import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const newSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
    })
    await request.validate({ schema: newSchema })
    try {
      if (await User.findBy('email', request.only(['email']).email)) {
        return response.status(400).send({ message: 'User already registered in the system' })
      }
      const data = await request.all()
      return User.create(data)
    } catch (e) {
      return response.status(500).send({ message: e.message })
    }
  }

  async login ({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password)
      const user = await User.query()
        .select(['id', 'name', 'email'])
        .where('email', email)
        .first()
      return response.send({
        id: user!.id,
        name: user!.name,
        email: user!.email,
        token: token.token,
      })
    } catch (e) {
      return response
        .status(401)
        .send({ message: e.message })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }
}

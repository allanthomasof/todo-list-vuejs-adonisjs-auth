import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Project from 'App/Models/Project';

export default class ProjectController {
  public async list({ response }: HttpContextContract) {
    try {
      const data = await Project.all()
      return response.send(data)
    } catch (error) {
      return response.status(500).send({ message: 'One error occourred' })
    }
  }

  public async listByUser({ request, response }: HttpContextContract) {
    const userID = request.params().user_id
    try {
      const data = await Project.query().where('user_id', userID).preload('tasks')
      return response.send(data)
    } catch (error) {
      return response.status(500).send({ message: error.message })
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const newSchema = schema.create({
      name: schema.string(),
      user_id: schema.number(),
    })
    await request.validate({ schema: newSchema })
    try {
      if (await Project.findBy('name', request.only(['name']).name)) {
        return response.status(400).send({ message: 'This project is already exists' })
      }
      const data = await request.all()
      return Project.create(data)
    } catch (error) {
      return response.status(500).send({ message: error.message })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const newSchema = schema.create({
      id: schema.number(),
      name: schema.string(),
    })
    await request.validate({ schema: newSchema })
    try {
      const data = await Project.findOrFail(request.only(['id']).id)
      if (data.name == request.only(['name']).name) {
        return response.status(400).send({ message: 'There is already a project with the same name' })
      }
      await data.merge({ name: request.only(['name']).name }).save()
      return response.send(data)
    } catch (error) {
      return response.status(500).send({ message: error.message })
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    try {
      const data = await Project.findOrFail(request.params().id)
      await data.delete()
      return response.send(data)
    } catch (error) {
      return response.status(500).send({ message: error.message })
    }
  }
}

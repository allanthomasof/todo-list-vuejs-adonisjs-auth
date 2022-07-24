import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task';

export default class TaskController {
  public async list({ response }: HttpContextContract) {
    try {
      const data = await Task.all()
      return response.send(data)
    } catch (error) {
      return response.status(500).send({ message: 'One error occourred' })
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const newSchema = schema.create({
      description: schema.string(),
      project_id: schema.number(),
    })
    await request.validate({ schema: newSchema })
    try {
      if (await Task.findBy('description', request.only(['description']).description)) {
        return response.status(400).send({ message: 'This task is already exists' })
      }
      const data = request.all()
      return Task.create(data)
    } catch (error) {
      console.log(error)
      return response.status(500).send({ message: error.message })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const newSchema = schema.create({
      id: schema.number(),
    })
    await request.validate({ schema: newSchema })
    try {
      const data = await Task.findOrFail(request.only(['id']).id)
      await data.merge({
        finishDate: request.only(['finish_date']).finish_date,
        checked: request.only(['checked']).checked,
      }).save()
      return response.send(data)
    } catch (error) {
      return response.status(500).send({ message: error.message })
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    try {
      const data = await Task.findOrFail(request.params().id)
      await data.delete()
      return response.send(data)
    } catch (error) {
      return response.status(500).send({ message: error.message })
    }
  }
}

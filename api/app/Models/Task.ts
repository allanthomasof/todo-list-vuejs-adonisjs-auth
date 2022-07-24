import { DateTime } from 'luxon'
import { column, BaseModel, hasOne, HasOne, afterFetch } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project';

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @hasOne(() => Project)
  public project: HasOne<typeof Project>

  @column()
  public projectId: number

  @column()
  public checked: boolean

  @column.dateTime()
  public finishDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

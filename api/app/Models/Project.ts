import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, HasMany, belongsTo, BelongsTo, beforeFind } from '@ioc:Adonis/Lucid/Orm'
import Task from 'App/Models/Task';
import User from 'App/Models/User';

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

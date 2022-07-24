/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { status: 'API is OK =)' }
})

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.get('/logout', 'AuthController.logout')

Route.get('/projects', 'ProjectController.list')
Route.get('/projects/:user_id', 'ProjectController.listByUser')
Route.post('/projects', 'ProjectController.create')
Route.put('/projects', 'ProjectController.update')
Route.delete('/projects/:id', 'ProjectController.delete')

Route.get('/tasks', 'TaskController.list')
Route.post('/tasks', 'TaskController.create')
Route.put('/tasks', 'TaskController.update')
Route.delete('/tasks/:id', 'TaskController.delete')

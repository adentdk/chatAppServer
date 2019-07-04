'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { message: 'Welcome to chatApps Server' }
})

Route.group(() => {
  
  Route.get('users/','UserController.index')
  Route.get('users/conversation/','UserController.conversation')

  Route.get('conversations/chat/:id','ConversationController.chats')

  Route.post('conversations/','ConversationController.store')
  Route.delete('conversations/:id','ConversationController.destroy')

  Route.post('groups/','GroupController.create')
  Route.get('groups/:id','GroupController.member')

  Route.resource('chats','ChatController')

}).prefix('api/v1/').middleware(['auth:jwt'])

Route.group(() => {

  Route.post('login','AuthController.login')
  Route.post('logout','AuthController.logout').middleware(['auth:jwt'])

}).prefix('auth')

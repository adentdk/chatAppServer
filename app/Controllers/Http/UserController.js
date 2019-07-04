'use strict'


const User = use('App/Models/User')
const Database = use('Database')

class UserController {

  async index ({ request, response, auth }) {
    try{
      const getUser =  await auth.getUser()
      const users = await User.query()
                          .select('id','name','username')
                          .whereNot('id',getUser.id)
                          .orderBy('name','ASC')
                          .fetch()

      response.send(users);
    }
    catch(err) {
      response.status(400).send(
        {
          "message": "error"
        }
      )
      console.log(err)
    }

  }

  async conversation ({ params, request, response, view, auth }) {
    try{
      const getUser = await auth.getUser()

      const user = await User.find(getUser.id)
      const conversation = await user.conversations()
                            .select('conversations.id', 'conversations.type',
                                    'conversations.created_at as timestamp',
                                    'users.name as partner','groups.name as group')
                            .leftJoin('users','users.id','conversations.partner')
                            .leftJoin('groups','groups.id','conversations.group_id')
                            .orderBy('id','desc')
                            .with('chat', builder => {
                                    builder.orderBy('id','desc')
                            }).fetch()
     
  
      response.send(conversation);
    }
    catch(err) {
      response.status(400).send(
        {
          "message": "error"
        }
      )
      console.log(err)
    }
  }
}

module.exports = UserController

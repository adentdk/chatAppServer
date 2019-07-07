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
      const personal = await user.conversations()
                            .select('conversations.id', 'conversations.type',
                                    'conversations.created_at as timestamp',
                                    'users.name as partner')
                            .leftJoin('users','users.id','conversations.partner_id')
                            .orderBy('id','desc')
                            .with('chat', builder => {
                                    builder.orderBy('id','desc')
                            }).fetch()

      const group = await user.group()
                          .select('id','name','avatar')
                          .with('conversation', builder => {
                            builder.with('chat', builder => {
                              builder.orderBy('id','desc')
                            })
                          })
                          .fetch()
     
  
      response.send({
        "personal" : personal,
        "group" : group
      });
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

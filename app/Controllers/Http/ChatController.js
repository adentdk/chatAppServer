'use strict'

const Chats = use('App/Models/Chat')

class ChatController {

  async store ({ request, response, auth }) {
    try{
      const getUser = await auth.getUser()
      const chats = request.only(['conversation_id','message'])
      chats.user_id = getUser.id
      
      const create = await Chats.create(chats)
      response.send({"message" : "success","data" : create})
    }catch(e){
      response.status(400).send({"message" : "error"})
      console.log(e)
    }
  }

  async show ({params,response}) {
    try {
      const chat = await Chats.find(params.id)
      response.send(chat)
    } catch (e) {
      response.status(400).send({
        "message" : "error"
      })
    }
  }

  async update ({ params, request, response }) {
    try{
      const {message} = request.only(['message'])
      const {id} = params
      
      const update = await Chats.query()
                                  .update({message,message})
                                  .where('id',id)

      response.send({"message" : "success","data" : update})

    }catch(e){
      response.status(400).send({"message" : "error"})
      console.log(e)
    }
  }

  async destroy ({ params, request, response }) {
    try{
      const {id} = params
      
      const chat = await Chats.find(id)

      const destroy = await chat.delete()

      response.send({"message" : "success","data" : destroy})

    }catch(e){
      response.status(400).send({"message" : "error"})
      console.log(e)
    }
  }
}

module.exports = ChatController

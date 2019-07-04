'use strict'

const Conversation = use('App/Models/Conversation')

class ConversationController {
  
  async store ({ request, response,auth }) {
    try {

      const getUser = await auth.getUser();
      const {type,partner} = request.only(['type','partner'])
      const conversationData = {type,partner,user_id : getUser.id}
      const conversation = await Conversation.create(conversationData)
      response.send(conversation);

    } catch (error) {

      response.status(400).send({
        "message" : "error"
      })
      console.log(err)

    }

  }

  async destroy ({ params, request, response }) {
    try {
      
      const conversation = await Conversation.find(params.id)
      const destroy = conversation.delete()

      response.send({"message" : "success"})
      console.log(destroy)
    } catch (error) {
      response.status(400).send({'message' : 'error'})
      console.log(error)
    }
  }



  async chats ({ params, request, response, auth }) {
    try {
      const getUser = await auth.getUser()

      const conversation = await Conversation.find(params.id)

      const detail_conversation = await Conversation.query()
                            .select('conversations.id', 'conversations.type',
                                    'conversations.created_at as timestamp',
                                    'conversations.partner as partner_id','users.name as partner',
                                    'conversations.group_id','groups.name as group')
                            .leftJoin('users','users.id','conversations.partner')
                            .leftJoin('groups','groups.id','conversations.group_id')
                            .where('conversations.id',params.id).fetch()

      const chats = await conversation.chat()
                        .select('chats.id','chats.user_id','chats.message','chats.is_read',
                                'chats.created_at as timestamp','users.name as sender')
                        .innerJoin('users','users.id','chats.user_id')
                        .fetch()

      response.send({
              "conversation" : detail_conversation,
              "chats" : chats,
              "myId" : getUser.id
              })

    } catch (error) {
      response.status(400).send({
        "messsage" : "error"
      })      
      console.log(error)
    }
  }

}

module.exports = ConversationController 
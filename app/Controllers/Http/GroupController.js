'use strict'

const Group = use('App/Models/Group');

const Database = use('Database')

class GroupController {

  async create ({ params, request, response,auth }) {
     try { 

      const {members,group_name} = request.only(['members','group_name'])

      const group = await Group.create(group_name)

      const members = await Database.table('group_members').insert({group_id : group.id, user_id : members})
      response.status(200).json({
              message: 'success',
              data: group
      })
    } catch (error) {
      response.status(400).send({
        "message" : "error"
      })
      console.log(error)
    }
  }

  async member ({ params, request, response }) {
    try { 
      const group = await Group.query()
                          .select('id','name','created_at')
                          .where('id',params.id)
                          .with('users', builder => {
                              builder.select('id','name')
                          })
                          .fetch();
      response.status(200).json({
              message: 'success',
              data: group
      })
    } catch (error) {
      response.status(400).send({
        "message" : "error"
      })
      console.log(error)
    }
  }
}

module.exports = GroupController

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GroupMember extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', (GroupMember) => {
          GroupMember.is_stil_member = true
        })
      }
}

module.exports = GroupMember

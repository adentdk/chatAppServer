'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupMembersSchema extends Schema {
  up () {
    this.create('group_members', (table) => {
      table.increments()
      table.integer('group_id',10).unsigned()
      							.references('id')
      							.inTable('groups')
      							.onDelete('cascade')
      table.integer('user_id',10).unsigned()
      							.references('id')
      							.inTable('users')
      							.onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('group_members')
  }
}

module.exports = GroupMembersSchema

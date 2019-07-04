'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConversationsSchema extends Schema {
  up () {
    this.create('conversations', (table) => {
      table.increments()
      table.enu('type',['personal','group'])
      table.integer('user_id',10).unsigned()
      							.references('id')
      							.inTable('users')
      							.onDelete('cascade')
	  table.integer('partner',10).unsigned()
	  							.references('id')
	  							.inTable('users')
	  							.onDelete('cascade')
	  table.integer('group_id',10).unsigned()
      							.references('id')
      							.inTable('groups')
      							.onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('conversations')
  }
}

module.exports = ConversationsSchema

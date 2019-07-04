'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatsSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.text('message')
      table.boolean('is_read').defaultTo(0)
      table.integer('user_id',10).unsigned()
      							.references('id')
      							.inTable('users')
      							.onDelete('cascade')
      table.integer('conversation_id',10).unsigned()
      							.references('id')
      							.inTable('conversations')
      							.onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatsSchema

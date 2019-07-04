'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterGroupsSchema extends Schema {
  up () {
    this.create('alter_groups', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('alter_groups')
  }
}

module.exports = AlterGroupsSchema

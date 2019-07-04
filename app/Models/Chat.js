'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
    conversation() {
        this.belongsTo('App/Models/Conversation')
    }
    users() {
        this.belongsTo('App/Models/User')
    }
}

module.exports = Chat

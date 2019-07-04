'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conversation extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }
    chat() {
        return this.hasMany('App/Models/Chat')
    }
}

module.exports = Conversation

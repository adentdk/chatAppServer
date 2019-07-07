'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conversation extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }
    partner() {
        return this.belongsTo('App/Models/User','partner_id','id')
    }
    chat() {
        return this.hasMany('App/Models/Chat')
    }
    group() {
    	return this.belongsTo('App/Models/Group')
    }
}

module.exports = Conversation

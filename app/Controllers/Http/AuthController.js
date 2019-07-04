'use strict'

const User = use('App/Models/User')

class AuthController {
    async  login ({request,auth,response}) {
        const {email, password} = request.only(['email', 'password'])
        try {
                await auth.attempt(email,password)
                
                const user = await User.findBy('email',email)
                let token = await auth.generate(user)

                response.send({
                    "user" : user, "accessToken" : token
                })
            
        } catch (error) {
            response.status(400).send({
                "message" : "something went wrong"
            })
            console.log(error)
        }
    }

    async logout ({ auth,response }) {
        try {
            const logout  = await auth.logout()
            response.send({"message" : "berhasil logout"})
        }catch(error){
            response.status().send({"message" : "berhasil logout"})
            console.log(error)
        }
    }
    
}

module.exports = AuthController

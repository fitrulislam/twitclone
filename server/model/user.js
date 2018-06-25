const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  profile: String,
  password: String,
  following: Array,
  followers: Array,
}, {
  timestamps: true
})

let User = mongoose.model('User', userSchema)

userSchema.pre('save', function (next) {
  User.findOne({
    email: this.email
  })
    .then(user => {
      if (user !== null) {
        next('email has taken')
      } else {
        let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        let checkEmail = regexEmail.test(this.email)
        if(checkEmail === true) {
          let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
          let checkPassword = regexPassword.test(this.password)
          if(checkPassword === true) {
            next()
          } else {
            next('wrong password format')
          }
        } else {
          next('please input valid email')
        }
      }
    })
})

module.exports = User
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const {hasher} = require('../helpers/hasher')
var bcrypt = require('bcryptjs')

module.exports = {
  signup: async (req, res) => {
    try {
      let user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        profile: req.body.profile,
        password: hasher(req.body.password),
        followers: [],
        following: []
      }
      let newUser = await new User(user).save()    
      let token = jwt.sign({
        id: newUser._id,
        username: newUser.username
      }, secret)
      res.status(201).json({
        message: 'user created',
        token: token,
        user: newUser
      })
    } catch(error) {
      res.status(500).json({
        message: error
      })
    }
  },
  signin: async (req, res) => {
    try {
      let user = await User.findOne({username: req.body.username})
      if(user !== null) {
        let compare = bcrypt.compareSync(req.body.password, user.password)
        if(compare == true) {
          let token = jwt.sign({
            id: user._id,
            username: user.username
          }, secret)
          res.status(200).json({
            message: 'User logging in',
            token: token,
            user: user
          })
        } else {
          res.status(401).json({
            message: 'Wrong password'
          })
        }
      } else {
        res.status(401).json({
          message: 'User not found'
        })
      }
    } catch(error) {
      res.status(500).json({
        message: 'something went wrong'
      })
    }
  },
  allUser: async (req, res) => {
    try {
      let users = await User.find()
      res.status(200).json({
        message: 'all user data',
        users: users
      })
    } catch(error) {
      res.status(500).json({
        message: 'something went wrong'
      })
    }
  },
  oneUser: async (req, res) => {
    try {
      let decoded = jwt.verify(req.headers.token, secret)
      let user = await User.findOne({_id: decoded.id})
      res.status(200).json({
        message: 'one user data',
        user: user
      })
    } catch(error) {
      res.status(500).json({
        message: 'something went wrong'
      })
    }
  },
  following: async (req, res) => {
    try {
      let decoded = jwt.verify(req.headers.token, secret)

      let user = await User.findOne({_id: decoded.id})
      let array = user.following
      array.push(req.body.followerId)
      let updatedUser = await User.update({_id: decoded.id}, {following: array})

      let user2 = await User.findOne({_id: req.body.followerId})
      let array2 = user2.followers
      array2.push(decoded.id)
      let updatedUser2 = await User.update({_id: req.body.followerId}, {followers: array2})

      res.status(200).json({
        message: 'following ++'
      })

    } catch(error) {
      res.status(500).json({
        message: 'something went wrong'
      })
    }
  },
  unfollow: async (req, res) => {
    try {
      let decoded = jwt.verify(req.headers.token, secret)

      let user = await User.findOne({_id: decoded.id})
      let array = user.following
      let newArray = array.filter(data => data !== req.body.followerId)
      let updatedUser = await User.update({_id: decoded.id}, {following: newArray})

      let user2 = await User.findOne({_id: req.body.followerId})
      let array2 = user2.following
      let newArray2 = array2.filter(data => data !== decoded.id)
      let updatedUser2 = await User.update({_id: req.body.followerId}, {followers: newArray2})

      res.status(200).json({
        message: 'following --'
      })
    } catch(error) {
      res.status(500).json({
        message: 'something went wrong'
      })
    }
  }
}
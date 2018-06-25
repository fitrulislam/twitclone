const router = require('express').Router();
const userController = require('../controllers/userController')

router
  .post('/signin', userController.signin)
  .post('/signup', userController.signup)
  .post('/following', userController.following)
  .post('/unfollow', userController.unfollow)
  .get('/alluser', userController.allUser)
  .get('/oneuser', userController.oneUser)

module.exports = router
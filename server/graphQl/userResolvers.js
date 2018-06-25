const User = require('../model/user')

const userResolver = {
  Query: {
    users: async () => {
      try {
        const users = await User.find()
        return users
      } catch (error) {
        console.log(error)
      }
    },
  },
  Mutation: {
    deleteUser: async (_, {_id}) => {
      try {
        const deletedUser = await User.findByIdAndRemove({_id: _id})
        return {info: 'delete Success'}
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = userResolver
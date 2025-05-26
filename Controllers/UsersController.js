const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UsersModels = require('../Models/Users.models')
require('dotenv').config();


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const register = async (req, res) => {
  //   const { username, email, password } = req.body

  try {
    // const user = await UserModel.signup(username, email, password)
    const { username, email, password } = req.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const exists = await UsersModels.findOne({ username })
    if (exists) {
      return res.json({
        msg: 'Username already exists',
      })
    }
    const user = await UsersModels.create({
      username,
      email,
      password: hashedPassword,
    })
    // res.json({ success: true })

    //create a token
    const token = createToken(user._id)
    res.status(200).json({
      token: token,
      user: user,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message,
    })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    // const user = await UserModel.login(username, password)
    const userdata = await UsersModels.findOne({ username })
    if (userdata) {
      const passwordMatch = await bcrypt.compare(password, userdata.password)
      if (passwordMatch) {
        const token = createToken(userdata._id)
        return res.status(200).json({
          token: token
        })
      } else {
        return res.json({
            msg: 'Incorrect password'
        })
      }
    } else {
        return res.json({
            msg: 'Please signup first'
        })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message,
    })
  }
}

module.exports = { register, login }

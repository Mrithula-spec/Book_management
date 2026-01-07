import User from "../models/User.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
import { MESSAGES } from "../constants/messages.js"

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error(MESSAGES.INVALID_INPUT)
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error(MESSAGES.USER_EXISTS)
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error(MESSAGES.INVALID_CREDENTIALS)
  }
}

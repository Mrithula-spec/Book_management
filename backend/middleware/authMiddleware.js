import jwt from "jsonwebtoken"
import User from "../models/User.js" // if you want to attach user object

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Attach full user object (optional, but common)
      const user = await User.findById(decoded.id).select("-password")
      if (!user) {
        return res.status(401).json({ message: "User not found" })
      }

      req.user = user
      next()
    } catch (error) {
      console.error("JWT verification failed:", error.message)
      res.status(401).json({ message: "Not authorized, token failed" })
    }
  } else {
    res.status(401).json({ message: "No token provided" })
  }
}

export default protect

import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" })
    req.user = user
    next()
  })
}

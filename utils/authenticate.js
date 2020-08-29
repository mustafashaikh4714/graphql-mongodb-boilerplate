import jwt from 'jsonwebtoken'
export default (request) => {
  const authHeader = request.get('Authorization')
  if (!authHeader) {
    throw new Error('Authentication required!')
  }

  const token = authHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  return decodedToken.id.userId
}

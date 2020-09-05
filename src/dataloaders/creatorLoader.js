import User from '../../models/User'

export default async (keys) => {
  const creators = await User.find({ _id: { $in: keys } })
  const creatorMap = {}

  creators.forEach((creator) => {
    creatorMap[creator._id] = creator
  })

  return keys.map((key) => creatorMap[key])
}

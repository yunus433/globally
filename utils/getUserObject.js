module.exports = (user) => {
  return {
    _id: user._id,
    isComplete: user.isComplete,
    email: user.email,
  }
}

const { users } = require("./db/users")
const { categroys } = require("./db/categroys")
module.exports = () => {
  return {
    users,
    categroys
  }
}

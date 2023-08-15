const Mock = require("mockjs")
const users = Mock.mock({
  "list|20": [{
    "id|+1": 1,
    "title": "@csentence",
    description: "@county(true)",
    avatar: "@image(64x64)",
    sentence: "@csentence"
  }]
}).list
module.exports = { users }

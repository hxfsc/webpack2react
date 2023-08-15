const Mock = require("mockjs")
const categroys = Mock.mock({
  "list|30": [
    {
      "id|+1": 1,
      title: "@cword(4)",
      children: Mock.mock({
        "list|1-5": [
          {
            "id|+1": 1,
            title: "@cword(4)"
          }
        ]
      }).list
    }
  ]
}).list
module.exports = { categroys }

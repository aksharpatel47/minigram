const http = require("http")
const { postgraphql } = require("postgraphql")

http
  .createServer(
    postgraphql(process.env.DB_STRING || "", undefined, {
      graphiql: true,
    })
  )
  .listen(3000, err => {
    console.log("Server running on port", 3000)
  })

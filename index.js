const http = require("http")
const { postgraphql } = require("postgraphql")
const port = process.env.PORT || 3000
const app = http
  .createServer(
    postgraphql(process.env.DATABASE_URL || "", "public", {
      graphiql: true,
      dynamicJson: true,
      watchPg: true,
      graphiqlRoute: "/graphiql",
      extendedErrors: ["hint", "detail", "errcode"],
    })
  )
  .listen(port, err => {
    console.log("Server running on port", port)
  })

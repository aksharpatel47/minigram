const http = require("http")
const { postgraphql } = require("postgraphql")

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
  .listen(3000, err => {
    console.log("Server running on port", 3000)
  })

const pgLiteral = require("node-pg-migrate").PgLiteral
const { primaryKeyIDColumn, timestampColumn } = require("./migration_helpers")
exports.up = (pgm, run) => {
  pgm.createExtension("uuid-ossp")
  pgm.createTable("users", {
    id: primaryKeyIDColumn,
    name: { type: "varchar(30)", notNull: true },
    username: { type: "varchar(25)", notNull: true },
    email: { type: "varchar(100)", unique: true },
    mobile: { type: "varchar(20)", unique: true },
    image: { type: "varchar(200)" },
    thumbnail: { type: "varchar(200)" },
    created_at: timestampColumn,
    updated_at: timestampColumn,
  })
  run()
}

exports.down = (pgm, run) => {
  pgm.dropTable("users")
  pgm.dropExtension("uuid-ossp")
  run()
}

const pgLiteral = require("node-pg-migrate").PgLiteral

exports.up = (pgm, run) => {
  pgm.createExtension("uuid-ossp")
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: new pgLiteral("uuid_generate_v4()"),
    },
    name: { type: "varchar(30)", notNull: true },
    username: { type: "varchar(25)", notNull: true },
    email: { type: "varchar(100)", unique: true },
    mobile: { type: "varchar(20)", unique: true },
    image: { type: "varchar(200)" },
    thumbnail: { type: "varchar(200)" },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: new pgLiteral("current_timestamp"),
    },
    updated_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: new pgLiteral("current_timestamp"),
    },
  })
  run()
}

exports.down = (pgm, run) => {
  pgm.dropTable("users")
  pgm.dropExtension("uuid-ossp")
  run()
}

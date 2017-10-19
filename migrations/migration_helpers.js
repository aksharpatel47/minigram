const pgLiteral = require("node-pg-migrate").PgLiteral

exports.timestampColumn = {
  type: "timestamp with time zone",
  notNull: true,
  default: new pgLiteral("current_timestamp"),
}

exports.primaryKeyIDColumn = {
  type: "uuid",
  primaryKey: true,
  notNull: true,
  default: new pgLiteral("uuid_generate_v4()"),
}

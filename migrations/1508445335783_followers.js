const { timestampColumn } = require("./migration_helpers")
const userFKColumn = {
  type: "uuid",
  notNull: true,
  primaryKey: true,
  references: "users(id)",
  onUpdate: "cascade",
  onDelete: "cascade",
}

exports.up = (pgm, run) => {
  pgm.createTable("user_followers", {
    user_id: userFKColumn,
    follower_id: userFKColumn,
    created_at: timestampColumn,
  })

  run()
}

exports.down = (pgm, run) => {
  pgm.dropTable("user_followers")
  run()
}

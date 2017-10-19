const pgLiteral = require("node-pg-migrate").PgLiteral
const { timestampColumn, primaryKeyIDColumn } = require("./migration_helpers")

exports.up = (pgm, run) => {
  pgm.createTable("post_likes", {
    user_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      references: "users(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    post_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      references: "posts(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    created_at: timestampColumn,
  })

  pgm.createTable("post_comments", {
    id: primaryKeyIDColumn,
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    post_id: {
      type: "uuid",
      notNull: true,
      references: "posts(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    comment: { type: "varchar(140)", notNull: true },
    created_at: timestampColumn,
  })

  run()
}

exports.down = (pgm, run) => {
  pgm.dropTable("post_comments")
  pgm.dropTable("post_likes")

  run()
}

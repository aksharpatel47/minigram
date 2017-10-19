const pgLiteral = require("node-pg-migrate").PgLiteral
const { timestampColumn, primaryKeyIDColumn } = require("./migration_helpers")

exports.up = (pgm, run) => {
  pgm.createTable("media", {
    id: primaryKeyIDColumn,
    image: { type: "varchar(200)", notNull: true },
    thumbnail: { type: "text", notNull: true },
  })

  pgm.createTable("posts", {
    id: primaryKeyIDColumn,
    created_by: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    title: { type: "varchar(140)" },
    created_at: timestampColumn,
    updated_at: timestampColumn,
  })

  pgm.createTable("post_media", {
    post_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
    },
    media_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
    },
  })

  pgm.addConstraint(
    "post_media",
    "post_id_posts_fk",
    "foreign key (post_id) references posts(id) on update cascade on delete cascade deferrable initially deferred"
  )

  pgm.addConstraint(
    "post_media",
    "media_id_media_fk",
    "foreign key (media_id) references media(id) on update cascade on delete cascade deferrable initially deferred"
  )

  run()
}

exports.down = (pgm, run) => {
  pgm.dropTable("post_media")
  pgm.dropTable("posts")
  pgm.dropTable("media")
  run()
}

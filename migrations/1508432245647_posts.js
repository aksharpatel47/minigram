const pgLiteral = require("node-pg-migrate").PgLiteral
const timestampColumn = {
  type: "timestamp with time zone",
  notNull: true,
  default: new pgLiteral("current_timestamp"),
}

const primaryKeyID = {
  type: "uuid",
  primaryKey: true,
  notNull: true,
  default: new pgLiteral("uuid_generate_v4()"),
}

exports.up = (pgm, run) => {
  pgm.createTable("media", {
    id: primaryKeyID,
    image: { type: "varchar(200)", notNull: true },
    thumbnail: { type: "text", notNull: true },
  })

  pgm.createTable("posts", {
    id: primaryKeyID,
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

import { EntitySchema } from "typeorm";

export const PasswordReset = new EntitySchema({
  name: "PasswordReset",
  tableName: "password_resets",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    token: {
      type: "varchar",
      length: 255,
    },
    expires_at: {
      type: "datetime",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE"
    }
  }
});

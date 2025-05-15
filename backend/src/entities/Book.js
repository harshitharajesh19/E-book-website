import { EntitySchema, Timestamp } from "typeorm";
import { User } from "./User.js";

export const Book = new EntitySchema({
    name: "Book",
    tableName: "books",
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: true,
      },
      title: {
        type: "varchar",
        length: 50,
      },
      author: {
        type: "varchar",
        length: 50,
      },
      description: {
        type: "varchar",
      },
      coverImage: {
        type: "varchar",
      },
      file_url:{
        type: "varchar",
      },
      category: {
        type: "varchar",
        length: 50,
      },
      created_at: {
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
      },
      updated_at: {
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
      },
    },
    relations: {
      owner: {
        type: "many-to-one",
        target: "User",
        joinColumn: {
          name: "owner_id",
        },
        onDelete: "CASCADE",
        eager: true,
      },
    },
});

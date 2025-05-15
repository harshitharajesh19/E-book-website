import { EntitySchema } from "typeorm";

export const Wishlist = new EntitySchema({
  name: "Wishlist",
  tableName: "wishlists",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
    book: {
      type: "many-to-one",
      target: "Book",
      joinColumn: { name: "book_id" },
      onDelete: "CASCADE",
    },
  },
});

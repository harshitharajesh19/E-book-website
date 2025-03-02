import { EntitySchema, Timestamp } from "typeorm";

export const Book = new EntitySchema({
    name: "Book", // Will use table name `category` as default behaviour.
    tableName: "books", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
            length: 50
        },
        author: {
            type: "varchar",
            length: 50
        },
        description: {
            type: "varchar"
        },
        coverImage: {
            type: "varchar"
        },
        file_url: {
            type: "varchar"
        },
        price: {
            type: "float"
        },
        owner_id: {
            type: "int"
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
});


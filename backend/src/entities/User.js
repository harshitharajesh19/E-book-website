import { EntitySchema, Timestamp } from "typeorm";

export const User = new EntitySchema({
    name: "User", // Will use table name `category` as default behaviour.
    tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            unique : true,
            type: "varchar",
            length: 50
        },
        email: {
            unique : true,
            type: "varchar",
            length: 50
        },
        password: {
            type: "varchar",
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


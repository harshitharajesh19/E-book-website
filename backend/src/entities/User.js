import { EntitySchema, Timestamp } from "typeorm";

export const User = new EntitySchema({
    name: "User", 
    tableName: "users", 
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
        gender: {
            type: "varchar",
            nullable: true,
        },
        profileImage: {
            type: "varchar",
            nullable: true,
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

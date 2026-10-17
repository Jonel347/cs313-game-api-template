'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoincrement: true,
                allowNull: false
            },

            school_id: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },

            user_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },

            password_hash: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            role: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: 'PLAYER'
            },

            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableNmae: 'users',
            timestamps: false
        }
    );

    return User;
};
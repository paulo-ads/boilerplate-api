import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(64),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(64),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);

export default User;

import sequelize from "../../config/db.js"
import { DataTypes } from "sequelize"

const user = sequelize.define('user',{
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isLoggedIn:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    isPlaying:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }
},{
    freezeTableName :true
})

export default user
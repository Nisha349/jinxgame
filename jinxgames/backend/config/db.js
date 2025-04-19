import Sequelize  from 'sequelize'

const sequelize = new Sequelize('jinxgames_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default sequelize
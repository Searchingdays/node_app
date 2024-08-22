import { Sequelize } from "sequelize";
import { QueryInterface } from "sequelize";

module.exports ={
    up: function(QueryInterface, Sequelize){
        return QueryInterface.addColumn(
            'users', 
            'password',
            Sequelize.DECIMAL
        );
    },

    down: function(QueryInterface, Sequelize){
        return QueryInterface.removeColumn(
            "users",
            "password"
        );
    }
}
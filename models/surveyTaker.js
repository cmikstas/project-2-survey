//Creating our survey model
module.exports = function(sequelize, DataTypes)
{
    let SurveyTaker = sequelize.define("SurveyTaker", {});

    SurveyTaker.associate = function(models)
    {
        SurveyTaker.belongsTo(models.User,
        {
            foreignKey:
            {
                allowNull: false
            }
        });
    };

    SurveyTaker.associate = function(models)
    {
        SurveyTaker.belongsTo(models.Survey,
        {
            foreignKey:
            {
                allowNull: false
            }
        });
    };
    
    return SurveyTaker; 
};
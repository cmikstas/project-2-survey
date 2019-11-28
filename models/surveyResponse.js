//Creating our survey model
module.exports = function(sequelize, DataTypes)
{
    let SurveyResponse = sequelize.define("SurveyResponse", {});

    SurveyResponse.associate = function(models)
    {
        SurveyResponse.belongsTo(models.SurveyChoice,
        {
            foreignKey:
            {
                allowNull: false
            }
        });
    };

    SurveyResponse.associate = function(models)
    {
        SurveyResponse.belongsTo(models.User,
        {
            foreignKey:
            {
                allowNull: false
            }
        });
    };

    return SurveyResponse; 
};
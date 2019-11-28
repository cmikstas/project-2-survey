//Creating our survey model
module.exports = function(sequelize, DataTypes)
{
    let Survey = sequelize.define("Survey",
    {
        surveyTitle:
        {
            type: DataTypes.STRING,
            allowNull: false
        },

        startTime:
        {
            type: DataTypes.DATE,
            allowNull: false
        },

        stopTime:
        {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Survey.associate = function(models)
    {
        Survey.belongsTo(models.User,
        {
            foreignKey:
            {
                allowNull: false
            }
        });
    };

    Survey.associate = function(models)
    {
        Survey.hasMany(models.SurveyTaker,
        {
            onDelete: "cascade"
        });
    };

    Survey.associate = function(models)
    {
        Survey.hasMany(models.SurveyQuestion,
        {
            onDelete: "cascade"
        });
    };

    Survey.associate = function(models)
    {
        Survey.hasMany(models.SurveyComment,
        {
            onDelete: "cascade"
        });
    };
    
    return Survey;
};
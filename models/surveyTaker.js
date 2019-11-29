//Creating our survey model
module.exports = function(sequelize, DataTypes)
{
    let SurveyTaker = sequelize.define("SurveyTaker",
    {
        isRead:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        username:
        {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    SurveyTaker.associate = function(models)
    {
        SurveyTaker.belongsTo(models.Survey,
        {
            onDelete: "cascade",
            foreignKey:
            {
                allowNull: false
            }
        });
    };
    
    return SurveyTaker; 
};
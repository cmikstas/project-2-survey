//Creating our survey model
module.exports = function(sequelize, DataTypes)
{
    let DistributionList = sequelize.define("DistributionList",
    {
        list:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    DistributionList.associate = function(models)
    {
        DistributionList.belongsTo(models.User,
        {
            onDelete: "cascade",
            foreignKey:
            {
                allowNull: false
            }
        });
    };

    return DistributionList; 
};
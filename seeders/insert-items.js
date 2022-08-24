module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Items", [
            {
                name: "Surrounded by Idiots",
                category: "buku",
                price: 225000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Deutsche Grammatik C1",
                category: "buku",
                price: 120000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Kerudung Khimar",
                category: "pakaian",
                price: 95000,                
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Items", null, {})
    }
}
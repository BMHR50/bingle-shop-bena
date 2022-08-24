// import models
const {Item} = require("../models")

module.exports = {
    getListItem: async (filters) => {
        let options = {}
        if (typeof filters !== "undefined" || filters !== null) {
            options.where = filters
        }
        let item = []
         
        // error handling
         try{
            item = await Item.findAll(options)
        } catch (e) {
            console.log(e)
        }
        //let res_item = Item.findAll(options)
        
        return item
   

        
    },

    getItemByID: async (id) => {
        let item = null
        try{
            item =  await Item.findOne({
                where: {id: id}
            })
        } catch (e) {
            console.log(e)
        }

        return item
    },

    addItem: async (item_body) => {
        let item = null
        
       
        try{
            item =  await Item.create(item_body)
        } catch (e) {
            console.log(e)
        }

        return item
    }
}

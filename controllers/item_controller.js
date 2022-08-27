// import library
const express = require('express')
const _ = require('lodash')

// /import models
const {Item} = require("../models")

// import use case
const item_uc = require("../usecase/item")

// init router
const router = express.Router()

//Path 1
router.get('/', async function (req, res){
    let category = req.query['category']
    let option = null
    if (typeof category !== "undefined") {
        option = {
            category: category
        }
    }
    let item = await item_uc.getListItem(option)
    let res_data = {
        "status": "ok", 
        "message": "success",
        "data": item
    }
    res.json(res_data)
})

// done
router.get('/detail/:id', async function (req, res) {
    let id = parseInt(req.params['id'])
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }
    let item = await item_uc.getItemByID(id)
    if (item === null) {
        res_data.status = 'failed'
        res_data.message = 'menu not found'
        res.status(400)
    }
    res_data.data = item
    res.json(res_data)
})

module.exports = router
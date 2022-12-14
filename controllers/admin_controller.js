/*
endpoint: /admin
description: admin controller/router
 */

// import library
const express = require('express')
const _ = require('lodash')

// import use case
const order_uc = require('../usecase/order')

const order_constants = require('../internal/constants/order')

const item_uc = require('../usecase/item')

// init router
const router = express.Router()

// import menu
let item_data = require('../data/item')

router.post('/item/add', async (req, res) => {
    let body = req.body
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": body
    }
    console.log(body)
    let addItem = await item_uc.addItem(body);
    console.log(addItem)
    res.json(res_data)
})

router.put('/item/update/:id', function (req, res) {
    let id = parseInt(req.params['id'])
    let updated_data = req.body
    for(let i = 0; i < item_data.length; i++) {
        if(item_data[i].id === id) {
            item_data[i] = updated_data
        }
    }

    let res_data = {
        "status": "ok",
        "message": "success",
        "data": item_data
    }

    res.json(res_data)
})

/*router.delete('/item/delete/:id', function (req, res) {
    let id = parseInt(req.params['id'])

    let new_menu_list = []
    for(let i = 0; i < menu_data.length; i++) {
        if (item_data[i].id !== id) {
            new_item_list.push(item_data[i])
        }
    }
    item_data = new_item_list

    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }

    res.json(res_data)
})*/



router.get('/order', async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success'
    }
    if (req.query['status'] === 'completed') {
        res_data.data = await order_uc.listCompletedOrder()
    } else {
        res_data.data = await order_uc.listOrderExcludePending()
    }

    res.json(res_data)
})

router.patch('/order/update', async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success',
        data: null
    }


    let order_id = req.body.id
    let status = order_constants[req.body.status]
    if (status === undefined) {
        res_data.status = 'failed'
        res_data.message = 'invalid status'
        return res.status(400).json(res_data)
    }
    await order_uc.changeOrderStatus(order_id, status)
    res.json(res_data)
})

module.exports = router

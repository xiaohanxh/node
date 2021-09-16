const express = require('express')
const sql = require('../public/javascripts/sql')
const router = express.Router()
const md5 = require('blueimp-md5')


router.post('/regist', (req, res) => {
  var body = req.body
  let s = "INSERT INTO users (userId,userName,password,eMail) VALUES ('" + body.id + "', '" + body.name + "', '" + body.password + "', '" + body.email + "')"
  sql(s, (err, r, f) => {
    if (err) {
      return res.status(201).send({ 'msg': '账号已存在！', 'code': '201' })
    }else{
      return res.status(200).send({ 'msg': '成功', 'code': '200', 'token': md5(md5(md5(body.password) + 'xiaohan')) })
    }
  })
})

router.post('/login', (req, res) => {
  var body = req.body
  let s = "SELECT * FROM users WHERE userId=" + body.id;
  sql(s, (err, r, f) => {
    if (err) {
      return res.status(500).send({ 'msg': 'Server Error...', 'code': '500' })
    } else if (r.length < 1) {
      return res.status(200).send({ 'msg': '用户名不存在', 'code': '201' })
    } else {
      if (r[0].passWord == body.password) {
        return res.status(200).send({ 'msg': '成功', 'code': '200', 'token': md5(md5(md5(body.password) + 'xiaohan')) })
      } else {
        return res.status(200).send({ 'msg': '用户名或密码错误', 'code': '201' })
      }
    }
  })
})

router.post('/message', (req, res) => {
  var body = req.body

  // User.findOne({
  //   id: body.id
  // }, (err, data) => {
  //   if (err) {
  //     return res.status(500).send({ 'msg': 'Server Error...', 'code': '500' })
  //   }
  //   return res.status(200).send({ 'msg': '成功', 'code': '0' , 'data': data })
  // })
})

module.exports = router
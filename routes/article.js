const express = require('express')
const sql = require('../public/javascripts/sql')
const fs = require('fs')
const Path = require('path')
const router = express.Router()

// 文章列表
router.get('/articlelist', (req, res) => {
  sql("select * from article", (err, r, f) => {
    if (err) {
      return res.status(500).json({ 'msg': 'Server Error...', 'code': '500' })
    }
    if (!r) {
      return res.status(200).json({ 'msg': 'none', 'code': '201' })
    }
    return res.status(200).json({ 'msg': '成功', 'code': '200', 'data': r })
  })
})

// 查询到文章
router.post('/articlebyid', (req, res) => {
  console.log(req.body)
  var body = req.body
  let s = "select * from article where id = " + body._id;
  sql(s, (err, r, f) => {
    if (err) {
      return res.status(200).json({ 'msg': 'Server Error...', 'code': '501' })
    } else {
      let rr = r[0];
      fs.readFile(rr.url, 'utf8', (err, text) => {
        if (err) {
          return res.status(200).json({ 'msg': 'Server Error...', 'code': '502' })
        } else {
          return res.status(200).json({ 'msg': '成功', 'code': '0', 'data': { 'message': rr, 'text': text } })
        }
      })
    }
  })
})

// 上传文章
router.post('/addarticle', (req, res) => {
  var body = req.body
  var path = Path.join('./public/', body.name)
  fs.access(Path.join('./public/', body.name), (err) => {
    // 判断文件夹是否存在
    if (!err) {
        savefile()
    } else {
      fs.mkdir(path, (err) => {
        if (err) {
          return res.status(200).json({ 'msg': 'Server Error...', 'code': '500' })
        } else {
          savefile()
        }
      })
    }
  })
  // 文件保存函数
  function savefile() {
    // md文件保存
    fs.writeFile(path + '/' + body.name, body.md, 'utf8', (err) => {
      if (err) {
        return res.status(200).json({ 'msg': 'updata false', 'code': '501' })
      } else {
        // img文件保存
        for (var i = 0; i < body.img.length; i++) {
          fs.writeFile(path + '/' + body.img[i].name, body.img[i].data.replace(/^data:image\/\w+;base64,/, ""), 'base64', (err) => {
            if (err) {
              return res.status(200).json({ 'msg': 'updata false', 'code': '502' })
            } else {
            }
          })
        }
      }
    })
  }
  // 封面
  fs.writeFile(path + '/' + body.src.name, body.src.data.replace(/^data:image\/\w+;base64,/, ""), 'base64', (err) => {
    if (err) {
      return res.status(200).json({ 'msg': 'updata false', 'code': '503' })
    } else {
      let p = path.replace("\\","/");
      let s = "INSERT INTO article (src, name,tag,url,author) VALUES ('" + p + '/' + body.src.name + "','" + body.name + "','" + body.tag + "','" + p + '/' + body.name + "','001')"
      console.log(s)
      sql(s, (err, r, f) => {
        if (err) {
          return res.status(200).json({ 'msg': 'Server Error...', 'code': '504' })
        }
        return res.status(200).json({ 'msg': '成功', 'code': '0' })
      })
    }
  })
})

module.exports = router
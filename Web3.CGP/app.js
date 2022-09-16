var bodyParser = require('body-parser');
// var fs = require('fs');
const express = require('express')
let session = require('express-session')


const app = express()
let mainRouter = require('./app/scripts/main');
let uploadRouter = require('./app/scripts/upload');
let mintRouter = require('./app/scripts/mint');

// 设置页面的跳转还有session的设置
app.use(session({ 	secret: '123456', // 加密key 可以随意书写
			cookie: { 
				maxAge: 365 * 24 * 60 * 60 * 1000   //1 year
			}
		}))

// 处理表单提交，对应请求头application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false // 为true时将使用qs库处理数据，通常不需要
 }))
 
// 处理fetch请求，对应请求头application/json
app.use(bodyParser.json())

//test
// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
// 	res.send('hello world')
//  })
//test end

app.use('/', mainRouter);
app.use('/upload', uploadRouter);
app.use('/mint', mintRouter);


const port = 17171;
app.listen(port);
console.log("http://localhost:" + port);
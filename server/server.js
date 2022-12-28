const express = require('express'),
app = express(),
bodyParser = require("body-parser"),
{downloadFromYt1s} = require('./scripts/downloadMusic')
console.log(downloadFromYt1s)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "pug")
app.set("views", __dirname + "/")
app.use(express.static(__dirname + "/"))

async function server(req, res) {
	let data = req.body
	//console.log(data)
	let getData = (Object.keys(data).length) ? await downloadFromYt1s(data.url) : null
	console.log(getData)
	res.render("index", {
      data: getData
    })
	//res.setHeader('Content-Type', 'application/json charset=utf-8')
}
app.get('/', server)
app.post('/download', server)
app.listen(8000)
/*var r = require("request");*/
const axios = require("axios");
const fs = require("fs");
const https = require("https")
const http = require("http")
const URL = require('url')

//windows reversed characters
const revChars = /\\|\/|\*|\:|\?|\"|\||\<|\>/ig,
//fix cert has expired error
skipCert = new https.Agent({
  rejectUnauthorized: false
})

//before anything all functions is async to finish all requests one by one and get the response

/*
@param: Array of Objects contains the url as url: 'https://....'
- the most benefit of using this function is that's always give you result ofr your url
Usage example
(async () => {
	let data = await downloadFromYtmp3([
		{url: "https://www.youtube.com/watch?v=UbNtHMy4ewA"},
		{url: "https://www.youtube.com/watch?v=UbNtHMy4ewA"},
		{url: "https://www.youtube.com/watch?v=orJSJGHjBLI"},
		{url: "https://www.youtube.com/watch?v=GYrl0wQjGH0"},
		{url: "https://www.youtube.com/watch?v=Uaw014umzn8"},
	])
	console.log(data)
})()
*/

function downloadFromYtmp3(data) {
	//ytmp3 api 
  const api = "https://154.82.111.45.sslip.io",
  //array to hold all responses data into objects conatins the following data about the reuired video {title, id, downloadMp3, downloadMp4, duration, thumbnail, quality}
    urls = []
  return new Promise((resolve, reject) => {
  	//a function to get the best quality in mp3 or webm
  	function getHighestQuality(arr) {
   		for(let i of arr) {
   			//console.log(i)
   			if(i.mp3_format_note.toLowerCase().indexOf('high') > -1) return [
   				i.mp3_url, 
   				i.mp3_format_note,
   				i.mp3_format
   			]
   			else if(i.mp3_format_note.toLowerCase().indexOf('medium') > -1) return [
   				i.mp3_url, 
   				i.mp3_format_note,
   				i.mp3_format
   			]
   			else if(i.mp3_format_note.toLowerCase().indexOf('low') > -1) return [
   				i.mp3_url, 
   				i.mp3_format_note,
   				i.mp3_format
   			]
   		}
   	}
    (async () => {
    	//handling errors 
    	try{
      	for (let i = 0; i < data.length; i++) {
      	  let url = data[i].url
      	  let req = await axios({
      	    method: "POST",
      	    url: api + "/newp",
      	    //u = url && c = country (you can change it to any country)
      	    data: "u=" + url + "&c=EG",
      	    //fix cert has expired error
      	    httpsAgent: skipCert
      	  })
      	  let {
      	    message,
      	    status
      	  } = req.data
      	  let {
      	    title,
      	    id,
      	    mp3,
      	    mp4,
      	    duration,
      	    thumbnail,
      	    mp4_cdn,
      	    mp3_cdn
      	  } = req.data.data
      	  //watch processing in console
      	  console.log(`${url} -- ${title} done`)
      	  //console.log(req.data.data)
      	  let mp3_url = mp3 ? mp3 : mp3_cdn ? mp3_cdn : null, quality, format
      	  //handling the video qualties
      	  if(mp3_url) {
      	  	//handling result deferant types (mp3, mp4)
      	  	let typeMp3 = mp3_url.filter((type, index) => type.mp3_format === 'mp3')
      	  	let typeWebm = mp3_url.filter((type, index) => type.mp3_format === 'webm')
      	  	//getting data as mp3 if possible else get it as webm
      	  	if(typeMp3.length) {
      	  		[mp3_url, quality, format] = getHighestQuality(typeMp3)
      	  	} else if (typeWebm.length) {
      	  		[mp3_url, quality, format] = getHighestQuality(typeMp3)
      	  	}
      	  	//handling the last url
      	  	mp3_url = (!mp3_url.startsWith('http')) ? api+mp3_url : mp3_url
      	  }
      	  //console.log(mp3)
      	  urls.push({
      	    title: title.replace(revChars, ''),
      	    id: id,
      	    downloadMp3: mp3_url,
      	    downloadMp4: mp4 ? api + mp4 : mp4_cdn ? mp4_cdn : null,
      	    duration: duration,
      	    thumbnail: thumbnail,
      	    quality: quality,
      	  })
      	  if (i === data.length - 1) resolve(urls)
      	}
  		} catch (err) {
  			resolve(`sorry an error occured ${err.message}`)
  		}
    })()
  })
}


/*
@param 1: Array || String contains all urls if it's string the urls is should to followed by new line
@param 2: String contains the file type like mp3, mp4 - be careful it's now handled to get just mp3 data but not handled for mp4 options - you can leave it for no untill the next contribution
Usage example:
(async () => {
	let data = await downloadFromYt1s(`
		https://www.youtube.com/watch?v=pfPD183rUu0
		https://www.youtube.com/watch?v=Q921shchhi0
		https://www.youtube.com/watch?v=4qF7UsVL_3s
		https://www.youtube.com/watch?v=fGaMMHPkjPg
		https://www.youtube.com/watch?v=jZxRBNJdM_4
	`)
	console.log(data)
	for(let i of data) {
		//console.log(i.mp3)
	}
})()
*/

async function downloadFromYt1s(arr, ext) {
  ext = ext ? ext : 'mp3'
  //handling the urls as array or string
  if (arr.constructor === Array) arr = arr.map(e => e.trim())
  else if (arr.constructor === String) arr = arr.trim().split(",").map(e => e.trim())
  else throw 'Error: first parameter is should to have a value expexted types is (String, Array)'
 	// yr1s api
  let api = 'https://yt1s.com/api'
  return new Promise(async (resolve, reject) => {
  	//errs is an array to hold all failed urls like array of objects to call downloadFromYtmp3 function after finishing the loop to get the download data for failed urls
    let errs = [],
    //array to hold all responses data into objects conatins the following data about the reuired video as {title, id, ['download'+ext.replace(/^./, char => char.toUpperCase()) /*usually it's mp3 so it's should to be 'downloadMp3'*/], size, quality}
    urls = []
    for (let i = 0; i < arr.length; i++) {
      let url = arr[i]
      let req = await axios({
        method: 'POST',
        url: api + '/ajaxSearch/index',
        //q = query && vt = video type
        data: 'q=' + url + '&vt=' + ext
      })
      //get response object
      req = req.data
      //hanling errors
      let mess = req.mess
      //skip errors and push links made the error inside array to display all faild urls
      if (mess) {
        //getting all files made errors
        errs.push({
          url: url,
          error: mess
        })
        continue
      }
      //getting urls required data
      //video id
      let vid = req.vid,
      	//video type and usually mp3
        type = req.links[ext],
        //getting the object keys as array
        typeKeys = Object.keys(type),
        //getting the highest quality by default it's should to be mp3128
        hq = typeKeys[typeKeys.length - 1],
        //getting the video key and size
        k = type[hq].k,
        size = type[hq].size
      //access download link by providing video id && genrated key
      let convert = await axios({
        method: 'POST',
        url: api + '/ajaxConvert/convert',
        data: 'vid=' + vid + '&k=' + k
      })
      //getting results data
      let downloadLink = convert.data.dlink,
        title = convert.data.title,
        status = convert.data.c_status,
        quality = convert.data.fquality
      if (downloadLink) {
        urls.push({
          title: title.replace(revChars, ''),
          id: convert.data.vid,
          ['download'+ext.replace(/^./, char => char.toUpperCase())]: downloadLink,
          size: size,
          quality: quality
        })
        //watch processing in console
      	console.log(`${url} -- ${title} done`)
      } //getting failed urls inside errs array
      else errs.push({
        url: url,
        error: convert.data.mess
      })
      if (i === arr.length - 1) {
        //after finish use downloadFromYtmp3 to get download data of failed urls
        if(errs.length >= 1) {
        	let ytmp3Data = await downloadFromYtmp3(errs, ext)
        	urls.push(...ytmp3Data)
        }
        //presenting the last result
        resolve(urls)
      } 
    }
  })
}

/*
@param 1: http url
@param 2: video title
@param 3: file direction like './path/'
@param 4: video type like mp3, mp4
Usage example:
(async () => {
	let data = await downloadFromYt1s(`
		https://www.youtube.com/watch?v=pfPD183rUu0
		https://www.youtube.com/watch?v=Q921shchhi0
		https://www.youtube.com/watch?v=4qF7UsVL_3s
		https://www.youtube.com/watch?v=fGaMMHPkjPg
		https://www.youtube.com/watch?v=jZxRBNJdM_4
	`)
	//console.log(data)
	for(let i of data) {
		//destructuring data
		let {id, title, downloadMp3, downloadMp4, quality} = i
		let saveTo = await saveToMyPC(downloadMp3, title, './songs/', 'mp3')
		console.log(saveTo)
	}
})()
*/
//Note: progress isn't submiited while the stream is written because ytmp3 api doesn't return content length that's may be handlded later
function saveToMyPC(url, title, dir, ext) {
  return new Promise(async (resolve, reject) => {
  	if(arguments.length !== 4) return 'Please fill all required parameters (url, title, dir, ext)'
  	url = URL.parse(url, true)
  	let options = {
  		host: url.host, 
      path: url.path,
      method: 'GET',
      //fix cert error
  		rejectUnauthorized: false,
      requestCert: true,
      agent: false
  	}
  	//console.log(url)
  	let req = https.request(options, async function(file) {
  		let ostream = fs.createWriteStream(dir+title.replace(revChars, '')+'.'+ext)
			file.pipe(ostream)
			file.on('end', function() {
				resolve(`${title} saved to ${dir}`)
    	})
		})
    req.end()
  })
}

module.exports = {
  downloadFromYt1s, downloadFromYtmp3, saveToMyPC
}
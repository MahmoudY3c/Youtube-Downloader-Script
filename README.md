# Youtube-Downloader-Script
Youtube-Downloader-Script is a script uses YTmp3, YTmp3 API's to download youtube videos in both mp3, mp4 and give you download the options to download in an object

## Overview 
- as the name refers this script allow you to download videos from youtube you can integrate it into you website or app to allow users download youtube videos throgh your website 

## Requirements
1. make sure that you are already installed `nodejs` if you are not installed you can download lastest version from [this link](https://nodejs.org/en/download/) 
2. make sure that you are installed `git` and clone the repo by `git clone https://github.com/MahmoudY3c/Youtube-Downloader-Script.git` 
3. open cmd and navigate to script folder `cd /path/to/script-folder` 
4. run `npm install` to install requirements
4. run `node downloadMusic` to run the script

## Usage 
- before we start you have to know that all functions used in this script is returning a promise and uses `Async/Await` to handle requests one by one - you will find a simple usage example for every function inside the script
- in this section we will going into some details about how it works

* script structure
```bash
# Functions 
├── downloadFromYtmp3 #getting videos from ytmp3 api
│	└── getHighestQuality #a function uses to get you the highest quality of the mp3 array of objects
├── downloadFromYt1s #getting videos from yt1s api
├── saveToMyPC # a function to download and save videos into your loca desk
```
### Description

1. `downloadFromYt1s` this used to download fron yt1s api but sometimes this api isn't getting the data for all videos it's maybe get just one of five videos so this function also uses `downloadFromYtmp3` to get download links for the failed links 
- the most valuable in using `yr1s` api that it's provide the `content-length` to show you the real size of the file while `ytmp3` api doesn't do that but it's returning the video duration while the other isn't 
- this function contains 2 parameters first can be a `String||Array` and the second is stirng holding the type you wish to download like `mp3`, `mp4` but for now it's working in `mp3` type

- there's 2 ways to use this function 
   - first by setting all links in a string seperated by new line like the following example

   __Tip__: be careful your links should to be seperated by new lines other wise you will be need to  modify `split()` method in `downloadFromYt1s` function to change he seperate option

  __Example__

```js
let data = await downloadFromYt1s([
  'https://www.youtube.com/watch?v=pfPD183rUu0',
  'https://www.youtube.com/watch?v=Q921shchhi0',
  'https://www.youtube.com/watch?v=4qF7UsVL_3s',
  'https://www.youtube.com/watch?v=fGaMMHPkjPg',
  'https://www.youtube.com/watch?v=jZxRBNJdM_4'
])
console.log(data)
```

- Second by setting all links in arraylike the following example

__Example__

```js
let data = await downloadFromYt1s([
  'https://www.youtube.com/watch?v=JGwWNGJdvx8',
  'https://www.youtube.com/watch?v=om6EutvhnlY',
  'https://www.youtube.com/watch?v=qqob4D3BoZc',
])
console.log(data)
```

- this function return array of objects something like the following which can be used for downloading the files in you PC or allow users to directly download it from your website

```js
[
  {
    title: 'اه دا اللي صار- ناي البرغوثي',
    id: '4qF7UsVL_3s',
    downloadMp3: 'https://dl181.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ3aTdPRFA4NW1
rRVJIODh0ZDgzZlJ0Z2pSNlJQTWI3Y2dMajZHQkJZeHJkdUl1bXNIbk5ZWVIxR21kVlluT2FGdk1rc0Z
qR2lmRTA0OTQ0UjZFdHFwNEhPc2tFektnM3NmMDB4VXV6Q1drTlozcFRQME9PekpmK3dWQ2hHTzNsYlN
NbUY2OWx5WG9oaHJHU0gxUDZtOU9HYTJWME1jTjhUR09UYWFoOThoQWp3ZmF4c01NZ3FqWWtGbXo0cEI
3bklVd0JtVTZmb0FPbjV6ODAvWHp0VVlOaU1SWmlHdTlwdmV5RTV3d1dmZTRkQ2NqZTNBdjdhcTllazh
QNlhJcjYxcVN5Zncyb0cwWkl1Wnk3VzNwM05Xdll5ZUlkOUR6VzVpSkw3WHM4SktyczZreTdoYVI0UER
Sd1o1Q3h3PT0%3D',
    size: '4 MB',
    quality: '128'
  },
  {
    title: 'اه يا حلو- ناي البرغوثي  Ah Ya Helu- Nai Barghouti',
    id: 'Q921shchhi0',
    downloadMp3: 'https://cdn2.ytsservice.com/cdn-resource/yt/12dd9e3dc38c401abb
dac2100e44b147_140.mp3?secure=YvCkaaX9rrz9PXDW0ZdOvg==,1672106886',
    downloadMp4: 'https://cdn2.ytsservice.com/cdn-resource/yt/12dd9e3dc38c401abb
dac2100e44b147_18.mp4?secure=q9RabBVPMhEIYhj2jwIbKA==,1672106886',
    duration: '6:49',
    thumbnail: 'https://i.ytimg.com/vi/Q921shchhi0/hqdefault.jpg',
    quality: 'AUDIO_QUALITY_MEDIUM'
  },
  {
    title: 'وَاللَه ما طَلَعَت شَمسٌ وَلا غَرُبَت - نوران أبو طالب',
    id: 'jZxRBNJdM_4',
    downloadMp3: 'https://154.82.111.45.sslip.io/dl2/Sq8oraKaNli0Js5GqqF9GMo1wBc
f_F5NyrJ0X9JEJqsIDUYMLgDP9C8-ry745tz89adMIx-Pgv7hMZ1TRQeMIDDY4g7otnvQscR2UafHMmN
DGajsTQwvWkZSRxK2zVgpSO_0BdFb0rAVp1O4I2ON2aerVpKWpTE5d_8FHlGEmnOhxa8nbngn5BmnCFj
sZJBhM1uWvIQ-q_FaV_WdKubRbtJzGByXau0Gi9mz1oGyjUHqmIDAyeEPq-BSWFBQZAG7CwT2fyA5EL_
NfvtmRXKE1inZ4YQdf9AQAcOBMKck8ys0n8IOl4csh4OKetv1GSqV9Ucc3fCdg1Eg975J7yuVaJ3U_Mb
dCVpNgM4ZnJXO-yYBl3wvxFYqNVS8TfBLk-bm381yh68UyziV2lTx4o3PkmnDLvGX8Y8W5tLsd8xgpoo
Da-GvuWbNzNV6GDGPA_mfK1WvXKVeoSXBSzkhVd4pLMGbqb-z_TfczJFH_WE7aeDZr4spTLn9II1SSGJ
fZsgNMTtDPVKe_H-MNdP4R49GjVPUJwwHFkw0o4jhEDS2NtKztKYyiJaQRnpLc96FWcB_YRLNekAifHD
rqV748Sauz32NWjKHxW8tjd8Jx50TBmMweDYiuA8lCCTaK7XLcQKbBvwO8M3vSkZrZzEauQELQeRpQ0J
dQXDDJf-FEpe1bgOv9_2tnab4lz4N3g9BWrMVbQ8BVMzASu_ca0FCMkKIn8bB5Box0qEmKu3lvXCVR6K
Bpv4lb1m3cJKxUbDJ92OQ2uNHU6Egwqrm4r0U332eXwUQ-D0JtuE_WcgVatf6zSS-rHonhAGA2IM-MwQ
Vk7Lj4zpPOhmcxzlBQhNcbUe8vBGu5g-gkFstwSpnlbMA4cd92Xnn1kDusjQTBEEydICDUdjzn6femmt
7z52FND96YUghIFw4lUan9HnC4MheBXi_G_nffN93jU59jj9rTn8DxhWS82sDwgCyBfJMayrQIco5Z2L
4C7iEHaqrlM_C8WQwUnl3HuhuR2eGcP2wS-9_CRbYhCONp_bpr5t-gJwGLYleEPlH88TR4YlIxdK_b5b
1VhlsqYrHXwJGshcEW6TUl6thzVhTavG53VpisKBNFw46pgD5E_cOO7jU15_d812go0OWLPt5MAYvnYe
cKeWyyeVwuV5ZqZXBVkDn83h7pnGvuoPkeow-JLJbyuIZTMgoE44MpnV7XVcAl-kk8K1gzJ-DOC6xB6X
dsLKWF7y4JLeGUg4CkM3kQuOBMnnGywd8BveYyi3ni4hXqW4ZW4Y3Fth7_lMk1B-vc1CGJBO0DKAQL8E
BasUK8OCvYPByZ2PI7fwISKlagtv2EaFFu6fSBF4N2yp4GLDOTBHJolNobLyb95Aj3peuOM5QtMqCtT6
_6UWbyEu3q0Hwogz6r41Z6350qkMd5vlJOn_7PQuwA_QGPt-l/L7ct6QiL',
    downloadMp4: 'https://154.82.111.45.sslip.io/dl2/dwzlr4vr7tllaXVW2wDKxCypOM7
golflBkX44IUmL_AUo-DAFcADFYjAexkt8_CjsAe7BOycAMLO1jt0BYDodqVjrr0gl-4siLYb5_XXFW9
fgeRitcbe6RCBqLD6mDg4bH5yBGeFTdygoInva0lyUbQraWQaqUvQEbNDDdyMObenA3cxXU46n5PRkJj
dywcLnGXvNoTvYo2-ssHy1JRXEGmivxCQbnx4pFEomv23xNtWatzoQbMdUPJM9mSKFtusU4qb00FMPR8
mwyw9rUR4B_YckeXu730lsruWmOM4GgI925Ox5YN7JPHxABttXhkHvLbc4MWluC5RdW9fJYFvsNj9HDl
8ATKIOZUelg-1x_Dyl_C4yTAHTiTZmLsS47tJhTq-geLsKUp9Jdx-UL-hD3Q-B9xaDXbfxpFmDKgBhIV
qDuMObpf63YuwaoY3aUsZhL33a_g05qBsK2740BJvReet3OiG8QyaRGOalds7C3acmUETajpl0bawh07
Eem03OB9XgnIhPrKso-RfCtYRTtGl_m3vk-PP6lbdBk9wSL5VbcS_u2jg3yxNWkglxRHoDidiDaVhguD
G9EZWsxbzfE_UIfu2lb4vIf5bZqe4EqpvAtjEJsCT7uYQHw5RjmRid4l1T5vt_pGJOA8bQvx44IGWqhw
tgMEgXge3sA1lqfpc0-2dlIYaJg0LDKFl74axwQp5Z51Ok9t-YDy4ipjVGZwsIfkhMvwdppmbO85_Fly
VBEM_xdO8TgUtmE6uUXt6gwkAfwmS30ur1tFtmmdiqE6lCKZT_rRF539aTnLUVJEsJTviIm_5PRHJk_L
rgcov941ytilkYAqHALEqD9EmMHqfxiJvJk1gunVHsSXmeITQ6XxosT59zHrG4KvlUiGXHXQPUVrxMyR
OVNIZdS5nijpRfjAgbGVD88xyz7CO3gOqecvrXIYAGe4waPpqV4kdmZFvYJKbjE3YLj1KX2Py2qG9j-Z
H8N9ZfHa3rORux7P263Isa4g-sdpygPEKtWi69mnZhFMUALlCRFki3RRnthtasP72z0aN-Ia4SdKLfYr
6nE3TwkbED1wtX2v1wTxl8qnEHKY3SrVbtbI4ZR9pnWDgqdiov8YQxfhlqyUj2KNPe5Hg4o46c-TuCMV
Age3qF1yrseMFsnGOnt4C6GrwCwmR1nkMOpTgT-f2nbk7jMYETCpyvJ3jhunQs1REZLUg6TmicKZpJ4l
nmPC3oYUV95gyXxYDpRBmtj7jRa8gQwBslOBhmFKgRaC3OYpwP4cE-9tIy9ycjOnzzw4QPEU7SsjD6e4
IPsXorXAqAzdVP77zoVFgnTwyZuS3UtIY8CjVacvssSn0PY_LzKi9hM2lLEZcOVrvZP4wWf_HRFZ-F-q
SDNiLCe2CRwSlp5ZaHyzx/F8wuzIg6',
    duration: '3:35',
    thumbnail: 'https://i.ytimg.com/vi/jZxRBNJdM_4/hqdefault.jpg?sqp=-oaymwEiCKg
BEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLB1hp68SiGbShwy233tzKImS8H
FJQ',
    quality: 'AUDIO_QUALITY_MEDIUM'
  }
]
```

- from the example above you should relised that there's some objects contains properties that isn't at the second like `quality, duration, size, thumbnail` but they'r all contains `downloadMp3, title, id` peoperties the other proties is created to give you more info about the media file anyway `duration,thumbnail` is related to `downloadFromYtmp3` while `size` is related to `downloadFromYt1s` 

2. `downloadFromYtmp3` this used to download fron ytmp3 api 
- this function contains just one parameter which is array of objects and every object is should to contain `url` property and doesn't have option to choose the type because it's talike `mp3` as default media type 

__Usage__

```js
let data = await downloadFromYtmp3([
  {url: "https://www.youtube.com/watch?v=UbNtHMy4ewA"},
  {url: "https://www.youtube.com/watch?v=UbNtHMy4ewA"},
  {url: "https://www.youtube.com/watch?v=orJSJGHjBLI"},
  {url: "https://www.youtube.com/watch?v=GYrl0wQjGH0"},
  {url: "https://www.youtube.com/watch?v=Uaw014umzn8"},
])
console.log(data)
```
- this function also returning array of objects like above with the following properties
`{id, title, downloadMp3, downloadMp4, quality, duration, thumbnail}`

3. `saveToMyPC` a function uses `https`, `fs` modules to download the media files directly into your PC  
- this function requires 4 params `(url, title, dir, ext)` and all parameters are required
  1. first, second is (download url, video title) and you can get them by using `downloadFromYtmp3` or `downloadFromYt1s` methods
  2. third parameter is the directory that you want to download the media files on it `/path/to/`
  3. fourth is extention or the media type and also you an get it by using `downloadFromYtmp3` or `downloadFromYt1s` methods

__Usage__
```js
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
```

##Use it in your server

- about this question i created a folder called `server` that contains a simple example of how to use it in your page - __Tip:__ errors isn't handled it's just for test + also serperation order changed to be comma instead of new line to separate urls inside the text field
- the folder contains a simple html page to explain how to implempent it in your server and there's the code snippt

```js
const express = require('express'),
app = express(),
bodyParser = require("body-parser"),
{downloadFromYt1s} = require('./scripts/downloadMusic')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "pug")
app.set("views", __dirname + "/")

async function server(req, res) {
	let data = req.body
	let getData = (Object.keys(data).length) ? await downloadFromYt1s(data.url) : null
	res.render("index", {
      data: getData
    })
}
app.get('/', server)
app.post('/download', server)
app.listen(8000)
```

# Issues 
 - if there's any suggestion or errors you can send issues or contribute 
- best regards

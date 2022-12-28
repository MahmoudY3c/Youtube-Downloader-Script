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
let data = await downloadFromYt1s(`
  https://www.youtube.com/watch?v=JGwWNGJdvx8
  https://www.youtube.com/watch?v=om6EutvhnlY
  https://www.youtube.com/watch?v=qqob4D3BoZc
`)
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
    title: 'Ed Sheeran - Shape of You (Official Music Video)',
    id: 'JGwWNGJdvx8',
    downloadMp3: 'https://cdn2.ytsservice.com/cdn-resource/yt/4fc86dc22d684e13af
ddf397e072af7c_140.mp3?secure=a9ejg1xQjFxY_qhcjk8l0w==,1672225175',
    downloadMp4: 'https://cdn2.ytsservice.com/cdn-resource/yt/4fc86dc22d684e13af
ddf397e072af7c_18.mp4?secure=4A_XQ2R7vwPoXFcXw5IQuA==,1672225175',
    duration: '4:24',
    thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
    quality: 'AUDIO_QUALITY_MEDIUM'
  },
  {
    title: 'PARTY MIX 2022 ? Best Mashups & Remixes Of Popular Songs 2022  ? EDM
 Party Electro HousePopDance',
    id: '',
    downloadMp3: 'https://154.82.111.45.sslip.io/dl2/xIsw8gguNLeuMhdATKXF03I4-Oz
q4EqLNaQoFDzWsi796IveE0RE5dqhTUBuRmqXaXMjGUNvHJ_gtmZ4XLV4xPM2NYzkuFg-6ThvKT1IXJr
TT4EYrWhP31bNMh0V6voxxMmbBVSsocOXAeFeqVY9LMSBEabOzEoAJx4W0a8iLYPcJVqXVc8swMasNwi
BhMwYMILKI69HfS8BZ3-h72BgN8-NpVz3HNicEPeLsZ887NxkANsTxKEGkCtxLfIbwS7YFsuEP2iiAU1
J1efZr3opU4zvSrNG8i0cREqVMxMhIjS1c9GZj5WD4R1AhEccMywek0F6xYdS5G2J39Nq94PhAxGg3-V
fDlsfe4UBueoegg_IWZITYmF6DzsQvj8aWK9gXI2EKeaKktlP-78Qs0KnMs1LsHbMXNDLHYH16bvJMlH
KXgQBTdRTlNWE8H1G-XO0YCXXD7uxx9i53B2y3leZfG74MvbK3kf8-Tn-S27f7lsq3_zj_L0ze4XM7ck
3Ufslr_8Qz7et43758zCPh_MCjQzrfRjYyqmHowhMOtOffoU4EVIiPhi4xOrXOFn_u-ys3TZJV4Y6Z6v
zQKOO3dXladzBN1D_RUvQEqgIehcGqD_xZMeFHzCTaxY0kTelZ-blu5Cm0wdApQVqoja2arQurgOglK0
6f-KNXRsuPIbogHdLfP4zT3zZpi21uTUW9E-0Oc-fNQBs7ypXy-rEbyGxcr9FkZEuvs7I87bveEs7Vi5
_7MT3Bn742zrcL1TxS_OmaYxHR41B4AQBG-CME_nD-x8pJiHN_swUBMWfIUlGGCYbRfcK1vEf7EOvUSh
OGJNGVPb8kk8jEPrPV-z2crl3D73VEqkbDA0dWj7eZbEyldol6C5OuEU4t2z6eSaE-SIMsWRh5u4QV0m
-dL7PTfSC2okZj3ar4YOcrtofo_R7hWC5Drbvj1RbG-sn3_hqtnO4H8AVe3I_CwHFSgu0cmMormqdShe
mHz9JYlpW7XIxmek_mXYGUKsz8mP8gfpm-WkkATqfrB6tlsOn1Zta-n-INorHQvMh4csDYv5Q0vPJvL5
liWoKKTUxJ5hDJqXE8D5Y_O_Gr4o8FYdIxVbEfc-SowqBz_e-BGrZ7RusZrC_nuw9gxz8kNKerM7rxfr
bq05cpV09sg1hR9WOvvN4WzTTX_2I_cXkPkmJdsx5EheeyrSP5HJiQjCwowTVoM2tbhC7BCDXPSV3q9A
TZ-rGLe0v-W4r857pEUw5r03cJfcTcYHcyozCD8JKox6jt1zWgNB1u73gVPP7JFFfkeapWc1O8nSqN2I
QcZHYrOa-U8cuCJ0W-iIXlPSBFmqk5UYH8ELzcwOasE0C7sxFo4NvJM_C/lY-qv8zO',
    downloadMp4: 'https://154.82.111.45.sslip.io/dl2/XZ97WHfkXtfh6n-o7dmMT97yj-p
EBitrDqoj6i9aBPzTvOe-UN5xwVEH9c9K0W3UTRgtcSkp0WsNGXGG5ZSIMqvB0HmpzXQySZeH_WCoKoB
8Bh0sTwm-V0Is_2_sRMra1rw8Pg81TulQ4yl1z791P6T6nFm3ixipHxTodTjQTz0CcmbO2BOjIaEWx6W
vIrrpfFlurM1gtrP2nw8zQvmir7QcXKhwclAygDuXaT-T02RauMnfs7t8nlNc0m65VCJe7nfLPdfsWon
SsHMoCg6QuzDsnQAVvUy-KvjxwCDm74gGK74_er4HEyFC0lrqocWy_WXffbG7cA8rzZeWr0zHoW8aap0
n6v7JJZ9kgEgyulyH6qbxpgGORXdzhn9CbQyYe0P7kloOisxoRF31uJG_K4jTWAdnwzhESSvzMldK6EX
ResQgHmh0OXblgzx3N86-smjS2YZoLW2BRUikIFpQEij3TtDLUPb71j8Du9oHoLuR0ol_0_6EEU-h5hD
NJfGNgE166J2VbbUZ8s4ow2MRTtgkvwwR0_aCcbwaK-Pveungnmw2gQ84k1iflJRlGG6gcDgN-ileWQk
Td6980fHv_jOJdsKlG30KfVb4SX9aSLEwPa9R2_CFXGn_HjCxA5GNQ8fqqOr_kFX4h90BEo71c8Sqe0g
WPDOr37SCNnYYZd3kONHSyQrYYHe1h7wAO4wMzjnb5hD2FBZB4TCCEelSkOU3hYASL5u3EEhl79rMywe
R4nKo7kX5DdfRTUxr14LBmyUd9Co_-5pr-csVfdu2-gkoLnmYyL8Y8oz4ygyWsO_270a61AryDNPwLeZ
CRP-xnXh1DevadNmu9N6l67YHgJnSmBGiU9gj_4DOiX4fj7_0O731zmu8JJDb3HXiAP1Ngd_MiugDhhp
J0yZ7l3CdfrKdHFO64L4QjQfNGC60QMMf_TXSboLrasheM8dKc3X0lCNePQqeS_rQoEy3kcmotZmjsZO
3Cadle3FY-18p4ihNVpnZ_0Q7YE9hzbuMeazTk9r8WmuIef8KOkI_qAoWnGlzj3rKEJ_FC-jgzsBjWwU
0gnUJQHZVRvB3KXeXJWpk0KxESqT5t5A2lyoOAtqLfQNcWkJBG8niE6GMpvhrPY3CFsONSjCbqoQysS6
a-oHIzCWzPTbxJMzQlideOH574Wkgfc9RFuojiC9B01QwBHAr41hSOMNLulvhTuBRqJR1p0pqi7_Py6D
bLf0YByOwyaJsRgwFnJxvLx7CGEp5_24a5gRAbl7eawUGrfYzxVE_gBUSsGFPGlndUpeoKBhNeypszCE
QESDYujV_Eow4behglYMKqqlChNmau-0rIPebkh-gpzOhyNjXMziV5ZngQg2zGmMU4WH7zod_bg/XzfG
DtOk',
    duration: '18:57',
    thumbnail: '',
    quality: 'AUDIO_QUALITY_MEDIUM'
  },
  {
    title: 'Anne-Marie - Ciao Adios [Official Video]',
    id: 'qqob4D3BoZc',
    downloadMp3: 'https://cdn2.ytsservice.com/cdn-resource/yt/f9bb135235504bb9a0
ababff054a2d82_140.mp3?secure=vSXGh58v48Z4ZLcdQIFgNg==,1672225178',
    downloadMp4: 'https://cdn2.ytsservice.com/cdn-resource/yt/f9bb135235504bb9a0
ababff054a2d82_18.mp4?secure=6wRSdKrLyggALJADC9omYg==,1672225178',
    duration: '3:30',
    thumbnail: 'https://i.ytimg.com/vi/qqob4D3BoZc/hqdefault.jpg',
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
  {url: "https://www.youtube.com/watch?v=JGwWNGJdvx8"},
  {url: "https://www.youtube.com/watch?v=om6EutvhnlY"},
  {url: "https://www.youtube.com/watch?v=qqob4D3BoZc"},
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
    https://www.youtube.com/watch?v=JGwWNGJdvx8
    https://www.youtube.com/watch?v=om6EutvhnlY
    https://www.youtube.com/watch?v=qqob4D3BoZc
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
{downloadFromYtmp3} = require('./scripts/index')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/downloadMp3', async (req, res) => {
  let data = req.body
  let getData = await downloadFromYtmp3(data)
  res.send(data)
  res.setHeader('Content-Type', 'application/json charset=utf-8')
})
app.listen(8000)
```

# Issues 
 - if there's any suggestion or errors you can send issues or contribute 
- best regards

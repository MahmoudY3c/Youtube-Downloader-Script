# Youtube-Downloader-Script
Youtube-Downloader-Script is a script uses YTmp3, YT1s API's to download youtube videos in both mp3, mp4 and give you download options to download in the media files in an object

## Overview 
- as the name refers this script allow you to download videos from youtube you can integrate it into you website or app to allow users download youtube videos throgh  

## Requirements
1. make sure that you are already installed `nodejs` if you are not installed you can download lastest version from [this link](https://nodejs.org/en/download/) 
2. make sure that you are installed `git` and clone the repo by `git clone https://github.com/MahmoudY3c/Youtube-Downloader-Script.git` 
3. open cmd and navigate to script folder `cd /path/to/script-folder` 
4. run `npm install` to install requirements
5. run `node downloadMusic` to run the script

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
    https://www.youtube.com/watch?v=fvEZUbzqqyM
    https://www.youtube.com/watch?v=km4YsvWTCfQ
    https://www.youtube.com/watch?v=-UChv0ntn-U
    https://www.youtube.com/watch?v=i1bhSwNU9Ek
    https://www.youtube.com/watch?v=M3mJkSqZbX4
  `)
console.log(data)
```

- Second by setting all links in arraylike the following example

__Example__

```js
let data = await downloadFromYt1s([
  'https://www.youtube.com/watch?v=fvEZUbzqqyM',
  'https://www.youtube.com/watch?v=km4YsvWTCfQ',
  'https://www.youtube.com/watch?v=-UChv0ntn-U',
])
console.log(data)
```

- this function return array of objects something like the following which can be used for downloading the files in you PC or allow users to directly download it from your website

```js
[
  {
    title: 'Mirrors - Justin Timberlake (Boyce Avenue feat. Fifth Harmony cover) on Spotify & Apple',
    id: 'fvEZUbzqqyM',
    downloadMp3: 'https://dl66.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ3aTdPRFA4NW1rRVJIOG12bzJpdG9vMUZ0b0s3NWZzb1Fobk5DcExzdEtQS3NPeG8vcE05Rk45anVUVU1hT1BocU0vWjRqUTJmSzBkODdyVGVFMjQ4eVZNWi9UMTM3bFBDbWhIcDVoMHpHYnRmWkhMNVBKanhhczFCdjFtaWUzS0tTdnh6MHRrSzlwbG1MTVdGWWxDSUVLT0hGODVvTmgwL0dmNlNoZ2JZRDZIUzUrOGhFMitTWStnTDV6dmx6ODlGOFRGWjdZWU5pMDQvbXkvbkNtbE1RalpzWnlFR2xvdWVaQkpFc0g2Q2hlQ0YxTURjTTF1bnFYUThoeVN3WTdHU0IvcTQzNDI4SGFKOTI1M1N4NjgzbWFBQ0xiczNpUnBlZEZlbXR0c244M2Y5M21udjBwUG5XallOdDJBVzNHNDc0UTk1VmxHaGxwTHVUN040ejFsKzAzMUpMMUxkYmxoaXRJeFZzQ0lSZGZuTU5jZz09',
    size: '5.2 MB',
    quality: '128'
  },
  {
    title: 'Tanner Patrick - When We Were Young (Adele Cover)',
    id: 'km4YsvWTCfQ',
    downloadMp3: 'https://cdn2.ytsservice.com/cdn-resource/yt/99c3d28776df496b87fd10e57c14ca4b_140.mp3?secure=pN4guaxPwNGDZuzmFwEu4Q==,1672235210',
    downloadMp4: 'https://cdn2.ytsservice.com/cdn-resource/yt/99c3d28776df496b87fd10e57c14ca4b_18.mp4?secure=DluvVUDUBpM2_y6-7n72yQ==,1672235210',
    duration: '4:44',
    thumbnail: 'https://i.ytimg.com/vi/km4YsvWTCfQ/hqdefault.jpg',
    quality: 'AUDIO_QUALITY_MEDIUM'
  },
  {
    title: 'ED SHEERAN - Perfect (Available in Spotify)',
    id: '-UChv0ntn-U',
    downloadMp3: 'https://cdn2.ytsservice.com/cdn-resource/yt/74e2964bb8e041ccb8e8b1a2438b7949_140.mp3?secure=2GKtBQlEK1_lLZU3LGL_Tg==,1672235211',
    downloadMp4: 'https://cdn2.ytsservice.com/cdn-resource/yt/74e2964bb8e041ccb8e8b1a2438b7949_18.mp4?secure=8JydKyWmby0wni1S5zM21A==,1672235211',
    duration: '4:25',
    thumbnail: 'https://i.ytimg.com/vi/-UChv0ntn-U/hqdefault.jpg',
    quality: 'AUDIO_QUALITY_MEDIUM'
  },
  {
    title: 'Mirrors - Justin Timberlake (cover by Andrew Ripp)',
    id: 'i1bhSwNU9Ek',
    downloadMp3: 'https://154.82.111.45.sslip.io/dl2/wMOfoUHXFa8waSTUFhYX7iUpuhtL39XCqW7_-cjsEVahtwdVqq0LpHMg1ugSkSM1_EvOC7ZbNOQ_RIt24ffAn_cSBF7-4fTmca7Tz2Kdvveaj1axsDXWCKlhiGptFZl150Oc2fhltTmK71n9xJ_5Dt2YD5Qp0V9yEsKyB9r5SFXXT48cKWQNG_lOYNAKJlzlVJRToZA-UrsM0r6tueRwa_meI8Z2TrXgl_R5in9AJxXDbSZj2BbS0qoAbci-X3zKTi-CzTMmNs7ehn4mUCl92bZ1uWTkmbIP9YNTiswA-3HmpUVghcIvKtkXQI1RRxge4rz3niRVGMwKTtu06ylGqAqk1WCidWDfCICFk2D_hxjya3iQG7-2RIHn6k79R25rQmhh4ZhZORXYqNQZvwbnd6Iiacbh3BFwFy0ESiyx4vb1d5Kws3N7q8vGFFrjexVk6zdQEKO0Kl_zG9I63v9WOtkKZYa8YBf7KKolPv-I1DOoErSD_LelLApXm-bcTM77AjAIFZBeSc5efirhDYPViwqSnYy_k9qwQyW4qQK5VAiOTKJ5UQmKR4pZ7ucnG17vsQUDKWPfJo3dk7a17gGmJCQoiZSiSehC9HfRRWUC7-dlNR4815UeJBmrOU6JQ-UijpYaYdTAJXuxu3gVkoFtPrzZKd4dPRlFoLyCt1HQfhf1xYRtrtph-9lLNReLRiKhrtb86dAB1Gymj1KPEkwbZjDmyxjjxhKgPQbFiK1j-CIkdmBZyDLIGsE6gwi0rizi5tVOJHf4kq0PlkI26sIMS0q0G9yBIRGQAbP_5GVVYIp-zJcU9ylgQf378LK9QuLuPxEE13E6bR8xktFFKYtrwUySoiXfT8Z4U0yaJfEAWjsVpveVSTgRMScIXlkLDcOFsb6iBpcccmi2oQLHDzk-oz0GA0GbXm772QgvE9DCG1qRJ3fnr4_-iYVdOv7GIoLdmQ6mRrDUWWO9gf07BfZSEFKyBLmqoR5qIUc-tkzJPCrCGaRaUsw85v7sAr_dko7FX5TRBNTbmFtmucXU6NzAC8z2ICkdVkwYLtaPQn-U_q4r37uoa17OhoRzjf2dkNt-Qv341GDkQ_n_LSrz-l3RLIt_IA89JI1UNAPv8jnahke1JevLZ9-0zp-5VJeqV39Mw2rICKXX8lcRLOgO8cA0zkXEm1KZEPE_yUrGcRFingTURwlPskXFA_FFC3vf7mq-PDQzy_xI1mPVzvD-e8Zrea4K1wvI-zlRpU5ORDpzLpzfjsLPUww09GSmRwLzVJaGuxh4Do7zX3DkIG73fRTjSfFSQgHIy9pkeFbvK3yiOoPAWwjMeSDwmRTwP9OY_e5WaHV6KXUQgLO3bAI9Wt3KhA/ZGtNtWbi',
    downloadMp4: 'https://154.82.111.45.sslip.io/dl2/0gHfzCadkDaFxqVIxXaEtOI5PngHiTDU_oHsZA8-JjfdusaHT3LUkssOczUFsYCrwefxcNtFz_b-9tDqkbNzPuR7RYsqWSIO3mDUxB3AWOoPeHEkP3RyaFejn17HFI_rHjd7XkVdSZSuIQpbhZvCoDuVoHC8-E4j5omrYF0QJ_8-DO4wTcSz0S_a8QDIn49gQI1LWN6n_Vz0tDvk0IoeGzUSeoiTKt2yVDXaaN9gDlchEpdMxEb5BpA2Hyw4NukVtFixC02JvlZDbFw2UpS3C0puxg8d6J9bzXGMR3_BcTBZtyCooURl9IoGfgXCb1j4xXlK-DxKF7cIL7arNW6boBlZALnNZb09sCEA2yQis-_2QSH4yX7CA4-AeuJrAfI7hEqmWuMX61CUsjs-esvOl2HqDRnAvhiSq9rF95viPrlo0RxwMkMS_FkrdOiGjmnlqTu3Vwb5QKXK-L7vcdNXx0HDgYlO1QxZKC0cIGwSxOHpvRxGXHqklLxwJRqHh2IjLebMI22J6q3g0hQLrmLKKZjoy0-M0O-dpU4crhxA6XV0HMle1ldUskYuZPoI9sKb71YnGxB2D0GCeIeQwhqf0aZnvo7Qech9iX6oVVGWeYwCku6udKniIlBpZZHs4CNbrMypcQ437Gy6fNrpii0RdpFb6nttK9liczvmBABYbNWIvi7maMGQ1KphcV8v_IZQ2xHpN95dRn3eb5eGtleGyCxPkIgDvZgz2tdkOtCuLcpM1WAD4ZpoBTaj_lMNeEQOmcxWWFKj2WxFwXxQLIzQm6MHdQ-0W8NOa4H2-dxUUx4j1gG9E1Bitb0RwFk-P2ZNmD4wytstxboMBOkgQl8vwx5b5DP_LuXhSVAP3QZb5SLv2fz1fG48RmkLorMRPuQ3L1ENplPVmf0ZdqUk-Ded31-ZbpuA2LsaLDyTYqGT__jtWhc7xhjbqoM8hMC7lYj2w7aFRyouAljJ2YVIluMkv6Lwygcq3OZ7itMSfjaRtLcFies4wHKZz_zai0E3GlIFrfrXn14l7ycTjl4b_xDqqos8P7zFOAlBFAQvGZ2Yv9yMA1ve6t9FlOul9hN2bgmx98aGZArpJd1eqZ9DheC_v9xsSRmOE9IqoSq6hmlATpz9HeDAk5JonJTGDE-R3EMD_e1WAeuBpyzDy8vrm2shHc30FS-8nKHDt3PhFf7G6rFRlBL9DCERXmsAkNwSZMAoHkV3cJLxQqig0RihvJ7xafTw_C-tE1JnzcNrnyUJkTvqPS7BbRQhxL-F_Jpqhlk-gDdG1LTCGrEmMg1o3E_NRyJfA6Yq_F5yfbPWrC4ZipcBIsJI2cQI6rl8fVIILZxBTdN0/leIQeqDv',
    duration: '5:16',
    thumbnail: 'https://i.ytimg.com/vi/i1bhSwNU9Ek/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAhIfUrrwEO7QWqlkpUXBzFHlho1g',
    quality: 'AUDIO_QUALITY_MEDIUM'
  },
  {
    title: 'Zedd, Maren Morris, Grey - The Middle (Official Music Video)',
    id: 'M3mJkSqZbX4',
    downloadMp3: 'https://cdn2.ytsservice.com/cdn-resource/yt/5758f690ba1b49a4b475f8acb349a6b2_140.mp3?secure=OLlNDmfw0KI6fVuJVi4t1A==,1672235214',
    downloadMp4: 'https://cdn2.ytsservice.com/cdn-resource/yt/5758f690ba1b49a4b475f8acb349a6b2_18.mp4?secure=bdXPGeXcuWbHAlpj4Pkpsw==,1672235214',
    duration: '3:11',
    thumbnail: 'https://i.ytimg.com/vi/M3mJkSqZbX4/hqdefault.jpg',
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
  {url: "https://www.youtube.com/watch?v=fvEZUbzqqyM"},
  {url: "https://www.youtube.com/watch?v=km4YsvWTCfQ"},
  {url: "https://www.youtube.com/watch?v=-UChv0ntn-U"},
  {url: "https://www.youtube.com/watch?v=i1bhSwNU9Ek"},
  {url: "https://www.youtube.com/watch?v=M3mJkSqZbX4"},
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
    https://www.youtube.com/watch?v=fvEZUbzqqyM
    https://www.youtube.com/watch?v=km4YsvWTCfQ
    https://www.youtube.com/watch?v=-UChv0ntn-U
    https://www.youtube.com/watch?v=i1bhSwNU9Ek
    https://www.youtube.com/watch?v=M3mJkSqZbX4
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

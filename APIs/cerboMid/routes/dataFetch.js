var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function pyCall(para){
return new Promise(function (sucess, nosuccess) {

  const { spawn } = require('child_process');
  const pyprog = spawn('python', ['./../cerboBack/try.py',para]);
  
   pyprog.stdout.on('data', function (data) {
    sucess(data);
    });
  pyprog.stderr.on('data', (data) => {

    nosuccess(data);
     });

});

}


// function resoomerCall(){
//   var options = {
//     host: "https://resoomer.pro",
//     path: "summarizer/API_KEY=0372FE894651476C945D8EEF3F0DAC36&size=20&text="+"'This is where i will get the summary of the text. um um um um um um because i am stupid'",
// 		method: "POST"
//   };

//   post_req = http.request(options, function(res) {
//     res.setEncoding('utf8');
//     consloe.log(res)
//     res.on('data', function (chunk) {
//         console.log('Response: ' + chunk);
//     });

  
//   // router.post(options, function(res) {
//   //   console.log(res.statusCode);
//   //    console.log('HEADERS: ' + JSON.stringify(res.headers));
//   //   // res.setEncoding('utf8');
//   //   // res.on('data', function (chunk) {
//   //   //   console.log('BODY: ' + chunk);
//   //   // });
//   // });
// }


router.post('/', (req, res, next) => {

  // var data = req.body.bData;
  // var op = pyCall(data);

 //var abc =  resoomerCall();

//  const request = require('request-promise');

// // const options = {
// //     method: 'POST',
// //     uri: 'https://resoomer.pro/summarizer',
// //     body: req.body,
// //     json: true,
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': 'bwejjr33333333333'
// //     }
// // }

// request(options).then(function (response){
//     res.status(200).json(response);
// })
// .catch(function (err) {
//     console.log(err);
// })

  //op.then(function(result){
    result="{\
        'error': false,\
        'error_msg': '',\
        'response': {\
            'abstract_summary':{\
                    'title': 'Some topic',\
                    'about': 'Some meaningful data extracted of this meeting.',\
                    'date': '24-07-2018 10:00 a.m',\
                    'image': 'https://www.tutorialspoint.com/images/netmeeting.jpg'\
                            },\
            'minutes':[\
                {\
                    'note': 'some note list'\
                },\
                {\
                    'note': 'some note list'\
                },\
                {\
                    'note': 'some note list'\
                }\
            ],\
            'events':[\
                {\
                    'title': 'myEvent',\
                    'startDate': '2016-06-10 00:00:00',\
                    'endDate': '2016-06-10 23:59:59',\
                    'location': '',\
                    'message': 'my description'\
                }\
            ]\
        }\
    }";
    //console.log(typeof JSON.stringify(result));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  });
 

//})  

module.exports = router;


var express = require('express');
var router = express.Router();

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
router.get('/test', (req, res, next) =>{

    res.send('bleh');
    //return 'bleh';
});

router.post('/', (req, res, next) => {
    var request = require('request');
    var summary = "";
    request.post({
        url: 'https://resoomer.pro/summarizer/',
        form: {
            API_KEY: '0372FE894651476C945D8EEF3F0DAC36',
            text: "According to nodejs.org, Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.",
            size: '10'
        }
    }, function (err, httpResponse, body) {
        //res.send(body);
        var resultResoomer = JSON.parse(body);
        summary = resultResoomer.text.content;
    });
    result={
        'error': false,
        'error_msg': '',
        'response': {
            'abstract_summary':{
                    'title': 'Some topic',
                    'about': summary,
                    'date': new Date(),
                    'image': 'https://www.tutorialspoint.com/images/netmeeting.jpg'
                            },
            'minutes':[
                {
                    'note': 'some note list'
                },
                {
                    'note': 'some note list'
                },
                {
                    'note': 'some note list'
                }
            ],
            'events':[
                {
                    'title': 'myEvent',
                    'startDate': '2016-06-10 00:00:00',
                    'endDate': '2016-06-10 23:59:59',
                    'location': '',
                    'message': 'my description'
                }
            ]
        }
    };
    //return resoomerCall();
    res.send(result);
});

router.get('/bleh', (req, res, next) =>{
   // function resoomerCall(){


        var request = require('request');
        var FormData= require('form-data');
        
        // Set the headers
        var headers = {
            'Content-Type':'form-data'
        }
    
        // Configure the request
        var options = {
            url: 'https://resoomer.pro/summarizer/',
            method: 'POST',
            headers: headers,
            body: {'API_KEY': '0372FE894651476C945D8EEF3F0DAC36', 'text': "According to nodejs.org, Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.",'size':'10'}
        }
    
        // // Start the request
        // request(options, function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //             res.send(body);
        //     }
        //     // var form=new FormData();
        //     // form.append('my_data','blleh');
        //     // return form;
        // })

    request.post({url: 'https://resoomer.pro/summarizer/', 
                form: { API_KEY: '0372FE894651476C945D8EEF3F0DAC36', 
                        text: "According to nodejs.org, Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.", 
                        size: '10' } 
    }, function (err, httpResponse, body) {
        res.send(body);
    } );
        
   // }
    
});

module.exports = router;


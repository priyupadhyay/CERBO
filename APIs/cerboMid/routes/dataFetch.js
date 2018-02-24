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
router.post('/', (req, res, next) => {

  var data = req.body.bData;
  var op = pyCall(data);
  op.then(function(result){

    res.send(result);
  });
 

})  

module.exports = router;

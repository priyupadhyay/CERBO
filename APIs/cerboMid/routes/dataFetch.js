var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

let runPy = new Promise(function (sucess, nosuccess) {

  const { spawn } = require('child_process');
  const pyprog = spawn('python', ['./../cerboBack/try.py']);

  pyprog.stdout.on('data', function (data) {

    sucess(data);

  });
  pyprog.stderr.on('data', (data) => {

    nosuccess(data);

  });

});

router.post('/', (req, res, next) => {

  runPy.then(function (fromRunpy) {
    res.send(fromRunpy.toString());
    res.end(fromRunpy);
  });

})  

module.exports = router;

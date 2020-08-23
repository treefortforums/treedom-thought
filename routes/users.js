var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Treefort Create').send('Chaining work');
});

router.get('/about', function(req, res){
	res.send('I am a coder');
})

module.exports = router;

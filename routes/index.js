var express = require('express');
var router = express.Router();
var dots_list = require('/dots_list.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Список точек' });
  dots = dots_list.list;
  dots_list.sort(function compare(a,b)
  {
      return a.x-b.x;
  });
  res.send(dots_list);
  res.end(dots_list);
});

router.get('/test', function(req, res, next) {
  res.end('Testo');
    //res.send(JSON.stringify('Test info'));
});

module.exports = router;

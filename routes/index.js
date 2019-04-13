var express = require('express');
var router = express.Router();

// db stuff
const db = require('monk')('mongodb://localhost:27017/Trello');
const tasks = db.get('tasks');
const lists = db.get('lists');
const boards = db.get('boards');

//tasks
router.get('/tasks', async function (req, res){
  const results = await tasks.find({})
  res.send(results)
  db.close()
});
//this is where I got the info for below https://stackoverflow.com/questions/29560961/query-mongodb-for-multiple-objectids-in-array
router.get('/tasksByListId/:listId', async function (req, res){
  const list = await lists.findOne({_id :req.params.listId});
  const results = await tasks.find({ "_id": { "$in": list.taskIds } });
  res.send(results)
  db.close()
});

router.get('/task/:id', async function (req, res){
  const results = await tasks.find({_id :req.params.id})
  res.send(results)
  db.close()
});

router.post('/task', async function (req, res){
  const body = req.body 
  console.log("post task", body);
  const results = await tasks.insert(body)
  res.send(results)
  db.close()
});

router.put('/task/:id', async function (req, res){
  const body = req.body
  const results = await tasks.update({_id :req.params.id}, body)
  res.send(results)
  db.close()
});

router.delete('/task/:id', async function (req, res){
  const results = await tasks.remove({ _id :req.params.id })
  res.send(results)
  db.close()
});

//lists
router.get('/lists', async function (req, res){
  const results = await lists.find({})
  res.send(results)
  db.close()
});

router.get('/list/:id', async function (req, res){
  const results = await lists.find({_id :req.params.id})
  res.send(results)
  db.close()
});

router.get('/listByBoardId/:boardId', async function (req, res){
  const board = await boards.findOne({_id :req.params.boardId});
  const results = await lists.find({ "_id": { "$in": board.listIds } });
  res.send(results)
  db.close()
});

router.get('/list/:id', async function (req, res){
  const results = await lists.find({_id :req.params.id})
  res.send(results)
  db.close()
});

router.post('/list', async function (req, res){
  const body = req.body
  const results = await lists.insert(body)
  res.send(results)
  db.close()
});

router.put('/list/:id', async function (req, res){
  const body = req.body
  const results = await lists.update({_id :req.params.id}, body)
  res.send(results)
  db.close()
});

router.delete('/list/:id', async function (req, res){
  const results = await lists.remove({ _id :req.params.id })
  res.send(results)
  db.close()
});

//boards
router.get('/boards', async function (req, res){
  const results = await boards.find({})
  res.send(results)
  db.close()
});

router.get('/board/:id', async function (req, res){
  const results = await boards.find({_id :req.params.id})
  res.send(results)
  db.close()
});

router.post('/board', async function (req, res){
  const body = req.body
  const results = await boards.insert(body)
  res.send(results)
  db.close()
});

router.put('/board/:id', async function (req, res){
  const body = req.body
  const results = await boards.update({_id :req.params.id}, body)
  res.send(results)
  db.close()
});

router.delete('/board/:id', async function (req, res){
  const results = await boards.remove({ _id :req.params.id })
  res.send(results)
  db.close()
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `Laura's Express` });
});

module.exports = router;

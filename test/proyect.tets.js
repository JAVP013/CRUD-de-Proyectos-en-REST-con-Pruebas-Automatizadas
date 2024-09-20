const app = require ('expres');
const router = express.router();
const taskController = require('../controllers/proyectController');

router.get('/', (req, res)=> {
    const tasks = taskController.getAllProyect();
    res.status(200).json(tasks);
 });
 
 router.post('/', (req, res)=> {
     const { title, description } = req.body;
 
     /*const title = req.body.title;
     const description = req.body.description;*/
     const newTask = taskController.createProyect(title, description);
     res.status(200).json(newTask);
 
 });
 
 router.get('/:id', (req, res)=> {
     const { id } = req.params;
     const task = taskController.getProyectById(id);
     console.log(task);
     if(task.length>0)
         res.status(200).json(task);
     else
         res.status(404).json({code: 404, message: 'Task not found'});
 });
 
 router.put('/', (req, res) => {
     const taskUpdated = taskController.updateProyect(req.body);
     res.status(201).json(taskUpdated);
 });
 
 router.delete('/:id', (req, res) => {
     const { id } = req.params;
     const taskDeleted = taskController.deleteProyect(id);
     res.status(200).json(taskDeleted);
 });
 
 module.exports = router;
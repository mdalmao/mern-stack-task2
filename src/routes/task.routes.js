const express = require('express');
const router = express.Router();

const Task= require ('../models/task');
/*
router.get('/', (req, res)=> {
 Task.find()
.then(data => console.log(data))
.catch(err => console.log(err));
    res.json({
  status: 'API works' 
 })
});
*/
router.get('/', async(req, res) =>{
const tasks = await Task.find(); // como sabemos que puede demorar, con esta linea ya espera y ejecuta lo siguiente luego que termina esto
console.log(tasks);
res.json(tasks);

});
router.get('/:id', async(req, res) =>{
 const task = await Task.findById(req.params.id);
 res.json(task);
});

router.post('/',async (req, res) =>{
    const {title,descripcion} = req.body;
    const task = new Task({title, descripcion});
    await task.save();
    console.log(task);
    res.json({status:'Tarea Guardada'});
})

router.put('/:id', async(req,res)=>{
    const {title,descripcion} = req.body;
    const newTask = {title, descripcion};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    console.log(req.params.id);
    res.json({status:'Tarea Actualizada'});
});

router.delete('/:id', async(req,res)=>{
   await Task.findByIdAndRemove(req.params.id);
   res.json({status:'Tarea Eliminada'});
})



module.exports = router;
const Task = require('../models/Task')

//manipulacion de errores
const handlerError = (err) => {
    let errors ={}

    if (err.message==='Por favor ingrese un id') {
        errors.id='Por favor ingrese un id'
    }

    if (err.message==='Por favor ingrese un nombre') {
        errors.nombre='Por favor ingrese un nombre'
    }
    if (err.message==='Por favor ingrese una descripcion') {
        errors.descripcion='Por favor ingrese una descripcion'
    }
    if (err.message==='El nombre debe poseer mas de 6 caracteres') {
        errors.nombre='El nombre debe poseer mas de 6 caracteres'
    }
    if ( err.code === 11000) {
        errors.id='El id ya se encuentra registrado'
        return errors
    }

    //validacion de errores
    if(err.message.includes('task validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.saveTask = async (req,res) =>{
    const {id,nombre,descripcion,completada} = req.body
    if (nombre == undefined) {
        const err = {message:"Por favor ingrese un nombre"}
        const errors = handlerError(err)
        res.status(400).json({errors})
        return
    }
    if (descripcion == undefined) {
        const err = {message:"Por favor ingrese una descripcion"}
        const errors = handlerError(err)
        res.status(400).json({errors})
        return
    }
    const fechaCreacion = new Date()
    try {
        const newTask = await Task.create({id,nombre,descripcion,fechaCreacion,completada})
        res.status(201).json(newTask)
    } catch (error) {
        const errors = handlerError(error)
        res.status(400).json({errors})
    }
}

module.exports.getTask = async(req,res) =>{
   const Tasks = await Task.getAllTasks()
   if(Tasks.length > 0){
    res.status(200).json(Tasks)
   }else{
    res.status(404).json("no se encontraron Tasks")
   }
}

module.exports.getTaskById = async(req,res) =>{
    const {id} = req.params 
    const query = Task.where({id:id})
    try {
        const task = await query.findOne()
        if (task == null) {
           return res.status(404).json("no se encontro la tarea con ese id")
        }
        res.status(200).json(task)
    } catch (error) {
        console.log(error);
    }

}

module.exports.putTaskById = async(req,res) =>{
    const {id} = req.params 
    const query = Task.where({id:id})
    const {nombre,descripcion,fechaCreacion,completada} = req.body
    
    const task = await query.findOne()
    if (task == null) {
        return res.status(404).json("no se encontro la tarea con ese id")
    }
    task.nombre = nombre != null ? nombre : task.nombre
    task.descripcion = descripcion != null ? descripcion : task.descripcion
    task.fechaCreacion = fechaCreacion != null ? fechaCreacion : task.fechaCreacion
    task.completada = completada != null ? completada : task.completada
    task.save()
    res.status(200).json(task)
}


module.exports.deleteTaskById = async(req,res) =>{
    const {id} = req.params 
    const task = await Task.deleteOne({id:id})
    if (task == null) {
        return res.status(404).json("no se encontro la tarea con ese id")
    }
    res.status(200).json(task)
  
}

module.exports.completeTask = async(req,res) =>{
    const {id} = req.params 
    const query = Task.where({id:id})
    
    const task = await query.findOne()
    if (task == null) {
        return res.status(404).json("no se encontro la tarea con ese id")
    }
    task.completada = true
    task.save()
    res.status(200).json(task)
}

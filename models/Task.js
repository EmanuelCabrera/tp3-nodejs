const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    id: {
        type:String,
        require:[true,'Por favor ingrese un id'],
        unique:[true,'Ese id ya se encuentra registrado'],
        minlength:[1,'El id debe poseer mas de 6 caracteres'],
        lowecase:true
    },
    nombre: {
        type:String,
        require:[true, 'Por favor ingrese un nombre'],
        minlength:[6,'El nombre debe poseer mas de 6 caracteres']
    },
    descripcion: {
        type:String,
        require:[true, 'Por favor ingrese una descripcion'],
        minlength:[6,'La descripcion debe poseer mas de 10 caracteres']
    },
    fechaCreacion: {
        type:Date,
        require:[true, 'Por favor ingrese la fecha de creacion']
    },
    completada: {
        type:Boolean,
        require:false
    },
})

taskSchema.statics.getAllTasks = async function() {
    return await this.find()
}


const Task = mongoose.model('task',taskSchema)

module.exports=Task
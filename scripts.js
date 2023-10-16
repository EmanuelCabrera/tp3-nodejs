const app = require('./index')
const request = require('supertest');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


function main() {
    rl.question('Introduce un comando (list, add, complete, exit): ', (command) => {
      if (command === 'list') {
        getTask()
      } else if (command === 'add') {
        rl.question('Introduce los datos solicitados separados por "," id,nombre, descripcion: ', (command) => {
            const datos= command.split(",").map(item => item.trim())
            const body ={
                id:datos[0],
                nombre:datos[1],
                descripcion: datos[2]
            }
            addTask(body)
            main();
        })
      } else if (command === 'complete') {
        rl.question('Introduce el id de la tarea que desea completar: ', (command) => {
            completeTask(command)
            main();
        })
      } else if (command === 'exit') {
        console.log('Saliendo del programa.');
        rl.close();
      } else {
        console.log('Comando no reconocido. Comandos válidos: list, add, remove, exit.');
      }
  
      // Volver a llamar a la función principal para esperar el próximo comando
      main();
    });
  }
  
  
async function getTask() {
    const response = await request(app).get('/tasks')
    let tasks = []
    response.body.forEach(task => {
        if (task.id != null || task.id != undefined) {
            
            let tarea = {
                id: task.id,
                nombre: task.nombre,
                descripcion: task.descripcion,
                completada: task.completada
            }
            tasks.push(tarea)
        }
    });
    console.log(tasks);
}
async function addTask(body) {
    const response = await request(app).post('/tasks').send(body)
    
    console.log(response.body);
}
async function completeTask(id) {
    const response = await request(app).put('/tasks/complete/' + id)
    console.log(response.body);
}
  // Iniciar el programa
  main();
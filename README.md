# API TASK CON MONGODB
Esta api permite la gestion de tasks, el mismo corre en el puerto 4000
## Instalacion 

Ejecutar el comando npm i para instalar todas las dependencias
```
npm install
```

## Rutas
Las diferentes rutas que utiliza la api son:
Ruta GET "/tasks" devuelve todas las tasks insertadas
```
localhost:4000/tasks
```
Ruta GET "/tasks/:id" devuelve una tarea en especifico, mediante su ID
```
localhost:4000/tasks/1
```

Ruta POST "/tasks" esta ruta se encarga de crear nuevas tasks se le pasa un json por ej:
```
localhost:4000/tasks

{
    "nombre":"tarea prueba ",
    "descripcion":"Prueba de tasks",
    "completada":true
}
```
Ruta PUT "/tasks/:id" esta ruta se encarga de modificar una tarea en especifico mediante su id, se le pasa un json por ej:
```
localhost:4000/tasks/1

{
    "nombre":"modificar prueba ",
    "descripcion":"Prueba de tasks",
    "completada":true
}
```

Ruta PUT "/tasks/complete/:id" esta ruta se encarga de marcar como completadas a las tareas
```
localhost:4000/tasks/complete/1

```

Ruta DELETE "/tasks/:id" esta ruta se encarga de eliminar una tarea en especifico mediante su id
```
localhost:4000/tasks/1

```

## PASOS PARA CORRER EL SCRIPT
PARA CORRER EL SCRIPT HAY QUE USAR UNA TERMINAR Y ESCRIBIR 
Para correr el script es necesario tener el servicio corriendo y luego abrir una terminal en la ubicacion de la api y escribir el siguiente comando:
```
node scripts.js

```
Luego con las diferente sentencias podremos insertar nuevas tareas, listarlas o marcarlas como completadas
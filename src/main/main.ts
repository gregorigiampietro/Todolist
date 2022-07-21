import { app, ipcMain } from 'electron'
import * as path from 'path'
import Window from './window'
import DataStore from './data_store'
import mongoose, { modelNames, Schema } from "mongoose"

mongoose.connect("mongodb://localhost:27017/electronchallenge")

app.allowRendererProcessReuse = true

let mainWindow:Window,
    todoWindow:Window

let todoData = new DataStore({name: 'todo'})
const todoSchema = new mongoose.Schema({
    name: String
  })

let Todo = mongoose.model('Todo', todoSchema)
let teste = new Todo({ name: 'Teste' })
console.log(teste.name); // 'Teste'
teste.save()

let file = path.join(process.cwd(),'assets/index.html')
let addFile = path.join(process.cwd(),'assets/add.html')

async function createMainWindow() {
    mainWindow = new Window(file)
    
    mainWindow.once('show',() => { //função que busca os dados ao iniciar o programa
        mainWindow.webContents.send('todos', todoData.getTodos())
    })

    ipcMain.on('add-todo-window',createTodoWindow)
    
    ipcMain.on('add-todo',(event,todo:string) => {     
        let UTodoList = todoData.addTodo(todo).getTodos()
        mainWindow.webContents.send('todos',UTodoList)
    })

    ipcMain.on('delete-todo',(event,todo:string) => {
        let UTodoList =  todoData.deleteTodo(todo).getTodos()
        mainWindow.webContents.send('todos',UTodoList)
    })
}

function createTodoWindow(){
    if(!todoWindow) {
        todoWindow = new Window(addFile, {
            width: 200,
            height:200,
            parent: mainWindow,
            frame:false
        })

        todoWindow.on('closed',() => {
            todoWindow = null
        })

        todoWindow.removeMenu()
    }
}  

app.on('ready',createMainWindow)
app.on('window-all-closed',app.quit)
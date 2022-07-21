{
    const { ipcRenderer } = require('electron')

    const deleteTodo = (e:Event) => {
        ipcRenderer.send('delete-todo',(e.target as HTMLElement).textContent)
    }

    document.getElementById('createTodoBtn').addEventListener('click', () => {
        ipcRenderer.send('add-todo-window')
    })

    ipcRenderer.on('todos', (event,todo:Array<string>) => {
        const todoList = document.getElementById('todoList')        
        
        const todoItems = todo.reduce((htmlContent:string,todo:string):string => {
            htmlContent += `<li class='todo-item'>${todo}</li>`
            return htmlContent },'')
                    
        todoList.innerHTML = todoItems

        document.querySelectorAll('.todo-item')
                .forEach( item => item.addEventListener('click',deleteTodo))

    })
}
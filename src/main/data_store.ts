import ElectronStore from 'electron-store'
import mongoose, { modelNames, Schema } from "mongoose"

mongoose.connect("mongodb://localhost:27017/electronchallenge")

class DataStore extends ElectronStore {
    private t: Array<string>
    /*You can set a object as type and set as Options
    */
    constructor(settings:ElectronStore.Options<any>){
        super(settings)
        this.t = this.get('todos') || []
    }

    public saveTodos():DataStore {
        this.set('todos',this.t)
        return this
    }

    public getTodos(): Array<string> {
        this.t = this.get('todos') || []
        return this.t
    }

    public addTodo(todo:string):DataStore {
        this.t = [...this.t,todo]        
        return this.saveTodos()
    }

    public deleteTodo(todo:string):DataStore {
        this.t = this.t.filter(to => to != todo)
        return this.saveTodos()
    }
}

export default DataStore
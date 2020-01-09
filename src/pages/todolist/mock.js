import mock from "mockjs";
import item from "./item.js";

let liveTodos = new Array();

mock.mock("/todos", "get", (todos)=> {
    return liveTodos;
    // "itemList":JSON.stringify(liveTodos)
})


mock.mock("/todos", "post", (todo) =>{
    console.log("mock insert: " + todo.body);
    liveTodos.push(JSON.parse(todo.body));
})

mock.mock("/todos", "patch", (todo) =>{
    // console.log("mock update 1:" + liveTodos);
    var t = JSON.parse(todo.body);
    console.log("typeof: "+ typeof(todo.body));
    console.log("t: " + t);
    console.log(todo.body);
    let i = liveTodos.length;
    console.log("mock update 2:" + i);
    console.log("mock update 2:" + liveTodos);
    while(i--) {
        if(liveTodos[i].id === todo.id) {
            for (k in todo) {
                liveTodos[i][k] = todo[k];
            }
            break;
        }
    }
})

mock.mock("/todos", 'delete', (query) =>{
    console.log(query);
    let todo = query.body;
    console.log("delete: " + todo);
    let k;
    liveTodos.filter(t=>{
        for(k in todo) {
            if(todo[k] != t[k]) {
                return true;
            }
        }
        return false;
    });
   return todo;
})

import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const HOST = 'http://localhost:3000/todos/'
  const [state, setState] = useState([]);
  const [input, setInput] = useState('');

  //return list of todos sorted 
  const fetchTodos = async () => {
    const response = await axios.get(HOST);
    const todos = response.data;
    todos.sort((a,b) => {
      return a.id - b.id;
    })
    //console.log(response.data);
    setState(todos);
  };
  
  useEffect(() => {
   fetchTodos();
  }, [])

  //create todos
  const addTodo = async () => {
    const response = await axios.post(HOST, { title: input });
    setState((state) => [...state, response.data]);
    setInput('');
  };

  //event handler for submitting the todo you want to add
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  
  //toggle event handler of checkbox completion of todo
  const toggleComplete = async (todo) => {
    const { id,completed } = todo;
    await axios.put(HOST + id, { completed: !completed } );
    await fetchTodos();
  };

  //delete todo event handler
  const deleteTodo = async (id) => {
    await axios.delete(HOST + id);
    await fetchTodos();
  };

  //actual todos being displayed
  const todos = state.map(todo => {
    return (
      <div key = {todo.id}>
        <input 
        type='checkbox' 
        checked={todo.completed} 
        onChange={() => toggleComplete(todo)}
        />
        {todo.title} {' '} 
        <button onClick={() => deleteTodo(todo.id)}> DELETE </button>
      </div>
    );
  });

  //form for entering todos
  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <input type='submit' />
      </form>
      {todos}
    </>
  );
}

export default App;

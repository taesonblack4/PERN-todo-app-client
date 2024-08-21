import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const HOST = 'http://localhost:3000/todos'
  const [state, setState] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
    const response = await axios.get(HOST);
    console.log(response.data);
    setState(response.data);
   };
   fetchTodos();
  }, [])

  const addTodo = async () => {
    const response = await axios.post(HOST, { title: input });
    setState((state) => [...state, response.data]);
    setInput('');
  };

  const onSubmit = (e) => {
    e.target.preventDefault();
    addTodo();
  };

  const todos = state.map(todo => {
    return (
      <div>
        {todo.title}
        {' - ' + (todo.completed ? 'completed' : 'incomplete')}
      </div>
    );
  });

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

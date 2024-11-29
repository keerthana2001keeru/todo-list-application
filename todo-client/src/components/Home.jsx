import React,{ useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import axios from "axios";
import "./Home.css";

 function Home() {
    const [todos,setTodos]=useState([]);
    const [error, setError] = useState(null);
    const fetchTodos = () => {
        axios.get(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/tasks`)
          .then(result => {
            setTodos(result.data)
            setError(null);
          }
        )
          .catch(error =>{
            setError('Please try again later.');
           console.error(error)
    });
      };
      
      useEffect(() => {
        fetchTodos();
      }, [todos]);
    const handleEdit=(id,done)=>{
       
        axios.put(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/task/${id}`, {done: !done})
        .then(result=>{
          setTodos(todos.map(todo => 
            todo._id === id ? { ...todo,done:!done }:todo
          ));
            console.log(result)
             //location.reload()
            setError(null);
     } )
        .catch(err => {
            setError('Failed to update the task. Please try again.');
            console.error(err);
          });}

        const handleDelete=(id)=>{
            console.log(id)
            axios.delete(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/task/${id}`)
            .then(result=>{
                setTodos(todos.filter(todo => todo._id !== id));
                console.log(result)
                setError(null);
            })
            .catch(err => {
                setError('Failed to delete the task. Please try again.');
                console.error(err);
              });}
    
  return (
    <>
    <div className="todo-container">
    {error && (
  <div className="text-danger">
    {error}
  </div>
)}
      <h2 className="mt-4 text-center text-2xl/9 font-bold  text-gray-900">
            TODO LIST
          </h2>
      <CreateTask fetchTodos={fetchTodos}/>
      <ul className="p-0">
      {
        todos.length===0?
        <div><h2 className="text-center">no records found</h2></div>:
       
        todos.map((todo)=>(
            <li key={todo._id} >
            <div className="checkbox todo-task text-center m-2 justify-center">
                <button className="" onClick={()=>handleEdit(todo._id,todo.done)}>
                    {todo?.done ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
:
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
</svg>
}      </button>     
                {todo?.task}
                <button className="delete-btn" onClick={()=>handleDelete(todo._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg> </button> </div> 
</li>
       ))
       
      }
      </ul>
    </div>
    </>
  )
}
export default Home;
import React,{ useState } from "react"
import axios from 'axios'
import "./CreateTask.css"

function CreateTask() {
    const [task,setTask]= useState("");
    const [error,setError]=useState("");
    const handleTask=(e)=>{
      e.preventDefault();
      if (task.trim() === "") {
        setError("Task cannot be empty.");
        return;
      }
        axios.post(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/tasks`,{task})
        .then(result=>{
          setError('');
          setTask("");
          console.log(result)
     } )
    
        .catch(err=>{
          console.error(err)
 setError("failed to add task. Please try again.");
    })}
    

  return (
    <div>
       <div className="flex min-h-full flex-1 flex-col justify-center text-center px-6 py-12 lg:px-8">
       

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
             
              <div className="createtask mt-2 mb-1 flex gap-2">
                <input
                  id="name"
                  name={task}
                  type="text"
                  required
                  placeholder="Enter task"
                  autoComplete="off"
                  className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setTask(e.target.value)}
                />
                <button type="button"className="btn btn-secondary" onClick={handleTask}> ADD</button>
              </div>
            </div>

            <div>
             
             
            </div>

          
          </form>
          {error && (
  <div className="text-danger">
    {error}
  </div>
)}
         
        </div>
      </div>
    
    </div>
  )
}

export default CreateTask

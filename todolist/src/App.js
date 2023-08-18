import {useState, useRef} from 'react'
import styles from './App.module.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const localTasks = JSON.parse(localStorage.getItem('tasks'))
    return localTasks ?? []
  })
  const taskRef = useRef()

  
  const addTask = () => {
    setTasks(prev => {
      const newTasks = [...prev, task]

      const toJSON = JSON.stringify(newTasks)
      localStorage.setItem('tasks', toJSON)

      return newTasks
    })
    setTask('')
    taskRef.current.focus()
  }
  const removeTask = (task) =>
  {
    const afterRemove = tasks.filter(t => t !== task)
    setTasks(afterRemove)
    const toJSON = JSON.stringify(afterRemove)
    localStorage.setItem('tasks', toJSON)
  }
  return (
    <div className={styles.container}>
      <h1>To-do List</h1>
      <input
        value={task}
        ref={taskRef}
        onChange={e => setTask(e.target.value)}
        placeholder="Add task"
      />
      <button className={styles.addBtn} onClick={addTask}>Add task</button>
      {tasks.map((task) => (
          <div className={styles.task}>{task}<span className={styles.remove} onClick={() => removeTask(task)}>&#10006;</span></div>
      ))}
    </div>
  );
}

export default App;

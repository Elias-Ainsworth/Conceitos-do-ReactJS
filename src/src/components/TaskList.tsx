import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (!newTaskTitle) return;
    // A exclamação indica negação, logo, se não houver titulo não prosseguir com a função

    const NewTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    // Dando valor para todos os itens em Task
    // Math.random() gera um valor aleatório ao ID, não é recomendável utilizar essa função em ID devido a possibilidade de obter o mesmo valor para 2 diferentes tasks
    // isComplete deve ser falso pois acabamos de criar a Task

    setTasks(oldState => [...oldState, NewTask]);
    setNewTaskTitle('');

    //com a novateask criada, utilize o setTasks como callback
    //pegando o oldState, salve o valor dentro de um array (use o spread operator "..." para pegar todos os valores anteriores), e  adicione no final do array o novo valor "NewTask"

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newTasks = tasks.map(task => task.id == id ? {...task, isComplete: !task.isComplete } : task);

    setTasks(newTasks)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filteredTasks = tasks.filter(task => task.id != id);

    // crie uma task para filtrar todas as tasks que forem diferentes do id que a função recebe

    setTasks(filteredTasks);

    // insira o valor filteredTasks em setTasks

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
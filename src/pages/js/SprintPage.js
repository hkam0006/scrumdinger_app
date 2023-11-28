import { useState } from 'react';
import '../css/SprintPage.css'
import KanbanColumn from '../../components/js/KanbanColumn';
import { DragDropContext} from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid'

const listPlaceholder = {
  allocated: {
    title: "allocated",
    tasks: []
  },
  todo: {
    title: "todo",
    tasks: [{id: uuidv4(), task: "Task 1"}, {id: uuidv4(), task: "Task 2"}, {id: uuidv4(), task: "Task 3"}, {id: uuidv4(), task: "Task 4"}]
  },
  doing: {
    title: "doing",
    tasks: []
  },
  done: {
    title: "done",
    tasks: []
  }
}

function onDragEnd(result, columns, setColumns){
  if(!result.destination) return;
  const copiedColumns = {...columns}
  const {source, destination} = result;
  if (source.droppableId !== destination.droppableId){
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceTasks = [...sourceColumn.tasks]
    const destTasks = [...destColumn.tasks]
    console.log(sourceTasks)
    const [removed] = sourceTasks.splice(source.index, 1)
    destTasks.splice(destination.index, 0, removed)
    copiedColumns[source.droppableId]["tasks"] = sourceTasks
    copiedColumns[destination.droppableId]["tasks"]= destTasks
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.tasks];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    copiedColumns[source.droppableId].tasks = copiedItems
  }
  setColumns(copiedColumns)
}

export default function SprintPage(){
  const [columns, setColumns] = useState(listPlaceholder);
  
  return <>
    <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
      <div className="container">
        <div className="kanban-content">
          <div className="NotDoneBoard board" id="todo">
            <div className='Counter'>
              <h1>To Do</h1>
              {columns.todo.tasks.length > 0 ? <div className='CounterAlert'>{columns.todo.tasks.length}</div> : <div/>}
            </div>
            <KanbanColumn id="todo" tasks={columns.todo.tasks} key="todo"/>
          </div>
          <div className="InProgressBoard board" id="doing">
            <div className='Counter'>
              <h1>In Progress</h1>
              {columns.doing.tasks.length > 0 ? <div className='CounterAlert ToDoAlert'>{columns.doing.tasks.length}</div> : <div/>}
            </div>
            <KanbanColumn id="doing" tasks={columns.doing.tasks} key="doing"/>
          </div>
          <div className="CompletedBoard board" id='done'>
            <div className='Counter'>
              <h1>Completed</h1>
              {columns.done.tasks.length > 0 ? <div className='CounterAlert DoneAlert'>{columns.done.tasks.length}</div> : <div/>}
            </div>
            <KanbanColumn id="done" tasks={columns.done.tasks} key="done"/>
          </div>
        </div>
      </div>
    </DragDropContext>
  </>
}
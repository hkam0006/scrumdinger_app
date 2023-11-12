import { useState } from 'react';
import '../css/SprintPage.css'
import { FaBars } from "react-icons/fa6";
import { DndContext, closestCenter, rectIntersection, useSensor, PointerSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../../components/js/SortableItem';
import KanbanColumn from '../../components/js/KanbanColumn';

export default function SprintPage(){
  const notDoneListPlaceholder = [
    {id: "Javascript", columnID: "todo"},
    {id: "HTML", columnID: "todo"},
    {id: "CSS", columnID: "done"},
    {id: "Typescript", columnID: "doing"},
    {id: "Python", columnID: "done"}
  ]

  const [tasks, setTasks] = useState(notDoneListPlaceholder);
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null)

  return <>
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div className="container">
        <div className="kanban-content">
          <div className="NotDoneBoard board" id="todo">
            <h1>To Do</h1>
            <KanbanColumn id="todo" tasks={tasks.filter((task) => task.columnID === "todo")}/>
          </div>
          <div className="InProgressBoard board" id="doing">
            <h1>In Progress</h1>
            <KanbanColumn id="doing" tasks={tasks.filter((task) => task.columnID === "doing")} />
          </div>
          <div className="CompletedBoard board" id='done'>
            <h1>Completed</h1>
            <KanbanColumn id="done" tasks={tasks.filter((task) => task.columnID === "done")} />
          </div>
        </div>
      </div>
    </DndContext>
  </>

  function handleDragEnd(event) {
    const {active, over} = event;
    // console.log(active)
    // console.log(over)
  }

  function handleDragOver(event){
    const {active, over} = event
    const activeID = active.id
    const overID = over.id

    const isOverTask = over.data.current.type === "Task"
    if (isOverTask){
      console.log("Over Task")
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeID);
        const overIndex = tasks.findIndex((t) => t.id === overID);

        tasks[activeIndex].columnID = tasks[overIndex].columnID;
        return arrayMove(tasks, activeIndex, overIndex);
      })
    }

    const isOverColumn = over.data.current.type === "Column"

    if (isOverColumn){
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeID);
        const newColumnID = over.id;

        tasks[activeIndex].columnID = newColumnID
        return arrayMove(tasks, activeIndex, activeIndex);
      })
    }
  }

  function handleDragStart(event){}
}
import { SortableItem } from "./SortableItem";
import { Droppable } from "react-beautiful-dnd";

export default function KanbanColumn({ id, tasks }) {

  return <>
    <Droppable droppableId={id} key={id}>
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef} style={{
          width: "100%",
          height: "80%",
          background: snapshot.isDraggingOver ? 'black' : '#282c34',
          borderRadius: '10px',
        }}>
          {tasks.map((item, index) => {
            return (
              <SortableItem index={index} item={item} key={item.id} />
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable >
  </>
}
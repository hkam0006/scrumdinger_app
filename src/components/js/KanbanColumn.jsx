import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

export default function KanbanColumn(props) {

  const { setNodeRef } = useDroppable({
    id: props.id,
    data: {
      type: "Column"
    }
  })

  return <>
    <SortableContext id={props.id} items={props.tasks} >
      <div ref={setNodeRef}>
        {props.tasks.map((task) => (
          <SortableItem key={task.id} id={task.id} columnID={props.id} />
        ))}
      </div>
    </SortableContext>
  </>
}
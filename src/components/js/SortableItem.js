import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { FaBars } from "react-icons/fa6";

export function SortableItem(props) {

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({
      id: props.id,
      data: {
        type: "Task",
      },
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    }

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="ListItem" >
          <FaBars/>
          {props.id}
      </div>
    )
}
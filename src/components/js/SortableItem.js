import { Draggable } from "react-beautiful-dnd";
import { FaBars } from "react-icons/fa6";

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation;
  console.log(snapshot.dropAnimation)
  // move to the right spot
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  // add a bit of turn for fun
  const rotate = 'rotate(0turn)';

  // patching the existing style
  return {
    ...style,
    transform: `${translate}`,
    // slowing down the drop because we can
  };
}

export function SortableItem({index, item}) {
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div 
              {...provided.dragHandleProps} 
              {...provided.draggableProps} 
              className="ListItem" 
              style={getStyle(provided.draggableProps.style, snapshot)}
              ref={provided.innerRef}
            >
              <FaBars />
              <div className="TaskContent">{item.task}</div>
            </div>
          )
        }}
      </Draggable>
    )
}
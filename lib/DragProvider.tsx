import { ReactNode } from "react";
import { DragDropContext } from "react-beautiful-dnd";

export default function DragProvider({children} : {children : ReactNode}){
    return(
        <DragDropContext onDragEnd={() => {}}>
            {children}
        </DragDropContext>
    )
}
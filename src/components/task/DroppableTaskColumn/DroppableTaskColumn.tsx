import React from "react"
import { useDrop } from "react-dnd"
import * as s from "./style"
import { useTasksValue } from "@/states/tasksState"
import DraggableTask from "../DraggableTask/DraggableTask"
import { Task, TaskStage } from "@/types/Task"
import { useTaskIndexesValue } from "@/states/taskIndexesState"

export type DropResult = {
  taskStage: TaskStage
}

type Props = {
  columnStage: TaskStage
}

const DroppableTaskColumn: React.FC<Props> = ({ columnStage }) => {

  const [_, drop] = useDrop<DraggableTask>({
    accept: ["item"],
    drop: () => {
      const dropResult: DropResult = {
        taskStage: columnStage
      }
      return dropResult
    }
  })

  const tasks = useTasksValue()
  const taskIndexes = useTaskIndexesValue()
  const sortedTasks = taskIndexes.concat().sort((a, b) => a.index - b.index).map((taskIndex) => {
    const task = tasks.find(($0) => $0.id === taskIndex.taskId) ?? { id: "", title: "", stage: "todo" }
    return task
  })

  return (
    <ul
      ref={drop}
      css={s.colmnStyle}
    >
      {sortedTasks.map((task, index) => (
        task.stage === columnStage &&
        <DraggableTask
          id={task.id}
          title={task.title}
          index={index}
          key={task.id}
        />
      ))}

    </ul>
  )
}

export default DroppableTaskColumn
import React, { useEffect, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import * as s from "./style"
import { DropResult } from "../DroppableTaskColumn/DroppableTaskColumn"
import { useSetTasksState } from "@/states/tasksState"
import { useSetTaskIndexesState, useTaskIndexesValue } from "@/states/taskIndexesState"

type DraggableTask = {
  id: string,
  index: number
}

type Props = {
  id: string,
  title: string,
  index: number
}

const DraggableTask: React.FC<Props> = ({ id, title, index }) => {

  const ref = useRef<HTMLLIElement>(null)
  const setTasksState = useSetTasksState()
  const setTaskIndexesState = useSetTaskIndexesState()
  const taskIndexesState = useTaskIndexesValue()

  useEffect(() => {
    console.log(taskIndexesState)
  }, [taskIndexesState])

  const [, drag] = useDrag<DraggableTask>({
    type: "item",
    item: { id, index },
    end: (_, monitor) => {
      //drag and drop between columns
      const dropResult = monitor.getDropResult() as DropResult

      if (dropResult) {
        setTasksState((currentTasks) => {
          return currentTasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                stage: dropResult.taskStage
              }
            } else {
              return task
            }
          })
        })
      }
    }
  })

  const [, drop] = useDrop<DraggableTask>({
    accept: ["item"],
    drop: (item) => {
      //sorting within the same column
      const fromIndex = item.index
      const newIndex = index

      setTaskIndexesState((currentTaskIndexes) => {
        return currentTaskIndexes.map((currentTaskIndex) => {
          const index = currentTaskIndex.index
          if (newIndex < fromIndex) {
            if (index < newIndex) { return currentTaskIndex }
            if (index > fromIndex) { return currentTaskIndex }
            if (index === fromIndex) {
              return { ...currentTaskIndex, index: newIndex }
            }
            return { ...currentTaskIndex, index: currentTaskIndex.index + 1 }
          }

          if (newIndex > fromIndex) {
            if (index > newIndex) { return currentTaskIndex }
            if (index < fromIndex) { return currentTaskIndex }
            if (index === fromIndex) {
              return { ...currentTaskIndex, index: newIndex }
            }
            return { ...currentTaskIndex, index: currentTaskIndex.index - 1 }
          }

          return currentTaskIndex
        })
      })
    }
  })

  drag(drop(ref))

  return (
    <li
      ref={ref}
      css={s.taskStyle}
    >
      <p>
        {title}
      </p>
      <p>
        {index}
      </p>
    </li>
  )
}

export default DraggableTask
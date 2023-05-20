import React, { useEffect } from "react"
import * as s from "./style"
import DroppableTaskColumn from "../DroppableTaskColumn/DroppableTaskColumn"
import { Task, TaskIndex } from "@/types/Task"
import { useSetTasksState } from "@/states/tasksState"
import { useSetTaskIndexesState } from "@/states/taskIndexesState"

const tasks: Task[] = [
  {
    id: "a",
    title: "AAA",
    stage: "todo"
  },
  {
    id: "b",
    title: "BBB",
    stage: "inProgress"
  },
  {
    id: "c",
    title: "CCC",
    stage: "done"
  },
  {
    id: "d",
    title: "DDD",
    stage: "done"
  },
  {
    id: "e",
    title: "EEE",
    stage: "done"
  },
  {
    id: "f",
    title: "FFF",
    stage: "done"
  }
]

const taskIndexes: TaskIndex[] = [
  {
    taskId: "a",
    index: 0
  },
  {
    taskId: "b",
    index: 1
  },
  {
    taskId: "c",
    index: 2
  },
  {
    taskId: "d",
    index: 3
  },
  {
    taskId: "e",
    index: 4
  },
  {
    taskId: "f",
    index: 5
  },
]

const TaskBoard: React.FC = () => {

  const setTasksState = useSetTasksState()
  const setTaskIndexesState = useSetTaskIndexesState()

  //set initial state
  useEffect(() => {
    setTasksState(tasks)
    setTaskIndexesState(taskIndexes)
  }, [])

  return (
    <div css={s.boardStyle}>
      <DroppableTaskColumn
        columnStage="todo"
      />
      <DroppableTaskColumn
        columnStage="inProgress"
      />
      <DroppableTaskColumn
        columnStage="done"
      />
    </div>
  )
}

export default TaskBoard
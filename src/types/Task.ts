export type TaskStage = "todo" | "inProgress" | "done"

export type Task = {
  id: string,
  title: string,
  stage: TaskStage
}

export type TaskIndex = {
  taskId: string,
  index: number
}
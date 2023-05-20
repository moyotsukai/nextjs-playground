import { Task } from "@/types/Task"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

const tasksState = atom<Task[]>({
  key: "droppedColumnState",
  default: []
})

export const useTasksValue = () => useRecoilValue(tasksState)

export const useSetTasksState = () => useSetRecoilState(tasksState)

export const useTasksState = () => useRecoilState(tasksState)

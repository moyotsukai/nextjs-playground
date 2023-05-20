import { TaskIndex } from "@/types/Task"
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

const taskindexesState = atom<TaskIndex[]>({
  key: "taskindexesState",
  default: []
})

export const useTaskIndexesValue = () => useRecoilValue(taskindexesState)

export const useSetTaskIndexesState = () => useSetRecoilState(taskindexesState)

export const useTaskIndexesState = () => useRecoilState(taskindexesState)

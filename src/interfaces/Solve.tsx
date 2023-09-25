import { Categories } from "./Categories";

export interface Solve {
  id: string;
  cubeId: string;
  scramble: string;
  startTime: number;
  endTime: number;
  bookmark: boolean;
  time: number;
  rating: number;
  category: Categories;
}
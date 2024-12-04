export interface Task {
  id: number;
  title: string;
  level?: number;
  deadLine?: string;
  completed: boolean;
}

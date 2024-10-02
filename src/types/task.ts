export interface TaskPayload { 
    title: string;
    description: string
  }

  export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }
  
  export interface TasksState {
    tasks: Task[];
    filter: "all" | "completed" | "not_completed"; 
  }
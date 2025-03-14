export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = 'todo-tasks';

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  const parsedTasks = tasks ? JSON.parse(tasks) : [];
  return parsedTasks.sort((a: Task, b: Task) => Number(b.id) - Number(a.id));
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const deleteTask = (taskId: string) => {
  const tasks = getTasks();
  saveTasks(tasks.filter(task => task.id !== taskId));
};

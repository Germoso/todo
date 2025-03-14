"use client"

import { useEffect, useState } from 'react';
import Task from '@/components/Task';
import TaskInput from '@/components/TaskInput';
import { getTasks, Task as TaskType } from '@/utils/storage';
import TaskStats from '@/components/TaskStats';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const refreshTasks = () => {
    setTasks(getTasks());
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <section className="flex flex-col max-w-xl mx-auto">
      <TaskStats tasks={tasks} />
      <TaskInput refreshTasks={refreshTasks} />
      <div className='mt-4 flex flex-col gap-2'>
        {tasks.map(task => (
          <Task key={task.id} task={task} refreshTasks={refreshTasks} />
        ))}
      </div>
    </section>
  );
}

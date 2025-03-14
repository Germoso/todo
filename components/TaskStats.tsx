import { Card, CardBody } from "@heroui/card";
import { Task } from "../utils/storage";

interface TaskStatsProps {
  tasks: Task[];
}

function TaskStats({ tasks }: TaskStatsProps) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  // const percentageCompleted = totalTasks > 0
  //   ? Math.round((completedTasks / totalTasks) * 100)
  //   : 0;

  return (
    <Card className="mb-4">
      <CardBody
        className='flex flex-row items-center justify-between px-20 py-10'
      >
        <div>
          <h1 className="text-4xl font-bold">
            TODO
          </h1>
          <h2 className="text-sm">
            keep it up
          </h2>
        </div>
        <div className='h-40 w-40 rounded-full bg-orange-600 mt-2 flex justify-center items-center text-black font-extrabold text-4xl font-mono'>
          {completedTasks} / {totalTasks}
        </div>
      </CardBody>
    </Card>
  );
}

export default TaskStats;

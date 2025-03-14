"use client"

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { getTasks, saveTasks, Task } from "../utils/storage";
import { HiPlus } from "react-icons/hi";

interface TaskInputProps {
  refreshTasks: () => void;
}

function TaskInput({ refreshTasks }: TaskInputProps) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = () => {
    if (taskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: taskText.trim(),
        completed: false
      };
      const tasks = getTasks();
      saveTasks([...tasks, newTask]);
      setTaskText("");
      refreshTasks();
    }
  }

  return (
    <Card>
      <CardBody className="flex flex-row gap-2">
        <Input
          value={taskText}
          className='w-full'
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button
          isIconOnly
          className='w-min'
          onPress={handleSubmit}
        >
          <HiPlus className="w-4 h-4" />
        </Button>
      </CardBody>
    </Card>
  );
}

export default TaskInput;

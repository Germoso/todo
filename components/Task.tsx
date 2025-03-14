"use client"

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Task as TaskType, getTasks, saveTasks, deleteTask } from "../utils/storage";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { HiPencil, HiTrash, HiCheck, HiX } from "react-icons/hi";

interface TaskProps {
  task: TaskType;
  refreshTasks: () => void;
}

function Task({ task, refreshTasks }: TaskProps) {
  const [isChecked, setIsChecked] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);

    const tasks = getTasks();
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, completed: newState } : t
    );
    saveTasks(updatedTasks);
    refreshTasks();
  };

  const handleSaveEdit = () => {
    if (editedText.trim() && editedText !== task.text) {
      const tasks = getTasks();
      const updatedTasks = tasks.map(t =>
        t.id === task.id ? { ...t, text: editedText.trim() } : t
      );
      saveTasks(updatedTasks);
      refreshTasks();
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    refreshTasks();
  };

  return (
    <Card>
      <CardBody className='overflow-hidden'>
        {!isEditing ? (
          <div className="flex items-center justify-between">
            <Checkbox
              defaultSelected={isChecked}
              size="lg"
              onChange={handleChange}
            >
              <span
                style={{
                  textDecoration: isChecked ? 'line-through' : 'none',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.text}
              </span>
            </Checkbox>
            <div className="flex gap-1">
              <Button isIconOnly size="sm" variant="light" onPress={() => setIsEditing(true)}>
                <HiPencil className="w-4 h-4" />
              </Button>
              <Button isIconOnly size="sm" color="danger" variant="light" onPress={handleDelete}>
                <HiTrash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              className="flex-1"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              autoFocus
            />
            <Button isIconOnly size="sm" color="success" variant="light" onPress={handleSaveEdit}>
              <HiCheck className="w-4 h-4" />
            </Button>
            <Button isIconOnly size="sm" variant="light" onPress={() => {
              setIsEditing(false);
              setEditedText(task.text);
            }}>
              <HiX className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default Task
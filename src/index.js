import { createTask } from "./task";
import { defaultList, createList } from "./list";

const task1 = createTask(`name`, `description`, `dueDate`, `priority`);
const task2 = createTask(`name2`, `description2`, `dueDate2`, `priority2`);

defaultList.addTask(task1);
defaultList.addTask(task2);
console.dir(defaultList.tasks);

defaultList.removeTask(task1.id);
console.dir(defaultList.tasks);

import { deleteTask } from "./DOM";
import { allProjects, makeProject } from "./project";
import { makeTask } from "./project";
import { getAllTasks } from "./project"

function debuggingGetAllTasks() {
  debugger;
  const project = makeProject('test')
  project.addTask('title', 'description', 'due date', 'urgent')
  project.addTask('title', 'description', 'due date', 'urgent')
  project.addTask('special', 'description', 'due date', 'urgent')
  project.addTask('title', 'description', 'due date', 'urgent')
  project.addTask('title', 'description', 'due date', 'urgent')
  project.addTask('title', 'description', 'due date', 'urgent')
  allProjects.push(project)
  console.table(getAllTasks())
  debugger;
  deleteTask(9)
  console.table(getAllTasks())
  debugger;
}

export { debuggingGetAllTasks }

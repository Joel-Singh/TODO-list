const allProjects = []
let currentlyDisplayedProject = null

let taskID = 0
const makeTask = (title, description, dueDate, priority) => {
  taskID++
  return {
    title,
    description,
    dueDate,
    priority,
    id: taskID,
  }
}

let projID = 0
const makeProject = (name) => {
  projID++
  return {
    name,
    id: projID,
    taskArray: [],
    addTask: function(title, description, dueDate, priority) {
      this.taskArray.push(makeTask(title, description, dueDate, priority))
    },
    addTaskFromObject: function(taskObject) {
      this.taskArray.push(taskObject)
    },
    removeTask: function(index) {
      this.taskArray.splice(index, 1)
    },
    getTasks: function() {
      return this.taskArray
    },
  }
}

// I don't know how else to create a exported variable that is mutable
function setCurrentlyDisplayedProject(project) {
  currentlyDisplayedProject = project
}

function getProject(id) {
  return allProjects.find((project) => {
    return project.id == id
  })
}

function getAllTasks() {
  let allTasks = []
  allProjects.forEach((project) => {
    allTasks = allTasks.concat(project.getTasks())
  })
  return allTasks
}

const getTask = (id) => getAllTasks().find((task) => task.id == id)

export { makeProject, makeTask, getProject, getTask }
export {
  allProjects,
  currentlyDisplayedProject,
  setCurrentlyDisplayedProject,
  getAllTasks,
}

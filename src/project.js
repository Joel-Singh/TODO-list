const allProjects = []
let currentlyDisplayedProject = null

// I don't know how else to create a exported variable that is mutable
function setCurrentlyDisplayedProject(project) {
  currentlyDisplayedProject = project;
}

let taskID = 0;
const makeTask = (title, description, dueDate, priority) => {
  taskID++;
  return {
    title, description, dueDate, priority, id : taskID
  };
};

let projID = 0;
const makeProject = (name) => {
  projID++;
  return {
    name,
    id : projID,
    taskArray: [],
    addTask: function(title, description, dueDate, priority) {
      this.taskArray.push(makeTask(title, description, dueDate, priority));
    },
    removeTask: function(index) {
      this.taskArray.splice(index, 1);
    },
    getTasks: function() {
      return this.taskArray;
    }
  }
}

export { makeProject, makeTask }
export { allProjects, currentlyDisplayedProject, setCurrentlyDisplayedProject }

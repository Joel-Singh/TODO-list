import { createTaskDomElement, displayTasksOnDom } from "./DOM.js"
let id = 0;
const makeTask = (title, description, dueDate, priority) => {
  id++;
  return {
    title, description, dueDate, priority, id
  };
};

const makeProject = (name) => {
  return {
    name,
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

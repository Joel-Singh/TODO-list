import { makeProject } from './project.js'
const allProjects = []
const newTaskBtn = document.querySelector('.new-task-btn')
const projectListDOM = document.querySelector('.project-list')
function createTaskDomElement(taskObject) {
  const task = document.createElement('div')
  task.classList.add('task')
  task.classList.add('open')
  task.classList.add(taskObject.priority + '-task')

  const title = document.createElement('span')
  title.classList.add('title')
  title.innerText = taskObject.title

  const btnWrapper = document.createElement('div')
  btnWrapper.classList.add('priority-btn-wrapper')

  const notUrgentBtn = document.createElement('button')
  notUrgentBtn.classList.add('not-urgent-btn')
  const urgentBtn = document.createElement('button')
  urgentBtn.classList.add('urgent-btn')
  const veryUrgentBtn = document.createElement('button')
  veryUrgentBtn.classList.add('very-urgent-btn')

  btnWrapper.append(notUrgentBtn, urgentBtn, veryUrgentBtn)

  const dueDate = document.createElement('span')
  dueDate.classList.add('due-date')
  dueDate.innerText = taskObject.dueDate

  const description = document.createElement('span')
  description.classList.add('description')
  description.innerText = taskObject.description

  task.append(title, btnWrapper, dueDate, description)
  return task
}

function displayTasksOnDom(projectObject) {
  projectObject.getTasks().forEach((task) => {
    newTaskBtn.after(createTaskDomElement(projectObject));
  })
}

function createProjectDomElement(projectObject) {
  const domElement = document.createElement('div')
  domElement.innerText = projectObject.name;
  domElement.classList.add("project");
  return domElement;
}

function addProject(name) {
  const newProj = makeProject(name)
  allProjects.push(newProj)
  projectListDOM.prepend(createProjectDomElement(newProj));
}

export { createTaskDomElement, addProject, displayTasksOnDom }

import { makeProject } from './project.js'
import { allProjects } from './globalVariables.js'
import { displayTasksOnDOMEventListener } from './eventListeners.js'

const newTaskBtn = document.querySelector('.new-task-btn')
const projectListDOM = document.querySelector('.project-list')
function createTaskDomElement(taskObject) {
  const task = document.createElement('div')
  task.classList.add('task')
  task.classList.add('open')
  task.classList.add(taskObject.priority + '-task')
  task.setAttribute('id', taskObject.id)

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

function displayTasksOnDOM(projectObject) {
  const allDomTasks = [...document.querySelectorAll('.task-list > .task')]
  allDomTasks.forEach((element) => {
    element.remove()
  })
  projectObject.getTasks().forEach((task) => {
    newTaskBtn.before(createTaskDomElement(task))
  })
}

function createProjectDomElement(projectObject) {
  const projElement = document.createElement('div')
  projElement.innerText = projectObject.name
  projElement.classList.add('project')
  projElement.setAttribute('id', projectObject.id)
  projElement.addEventListener('click', displayTasksOnDOMEventListener)
  return projElement
}

function addProject(name) {
  const newProj = makeProject(name)
  allProjects.push(newProj)
  projectListDOM.prepend(createProjectDomElement(newProj))
}

export { createTaskDomElement, addProject, displayTasksOnDOM }

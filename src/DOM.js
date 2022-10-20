import {
  currentlyDisplayedProject,
  getAllTasks,
  makeProject,
  makeTask,
} from './project.js'
import { allProjects, setCurrentlyDisplayedProject } from './project.js'
import {
  displayProjectWithTasksOnDOMEventListener,
  priorityBtnEventListener,
} from './eventListeners.js'

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
  notUrgentBtn.addEventListener(
    'click',
    priorityBtnEventListener.bind(null, 'not-urgent', task)
  )

  const urgentBtn = document.createElement('button')
  urgentBtn.classList.add('urgent-btn')
  urgentBtn.addEventListener(
    'click',
    priorityBtnEventListener.bind(null, 'urgent', task)
  )

  const veryUrgentBtn = document.createElement('button')
  veryUrgentBtn.classList.add('very-urgent-btn')
  veryUrgentBtn.addEventListener(
    'click',
    priorityBtnEventListener.bind(null, 'very-urgent', task)
  )

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

function displayTask(taskObj) {
  newTaskBtn.before(createTaskDomElement(taskObj))
}

function changeTaskListHeader(newHeader) {
  document.querySelector('.project-name').innerText = newHeader
}

function removeDOMElementsInTaskList() {
  const allDomTasks = [
    ...document.querySelectorAll('.task-list > .task:not(.new-task-input)'),
  ]
  allDomTasks.forEach((element) => element.remove())
}

function displayProjectWithTasksOnDOM(projectObject) {
  removeDOMElementsInTaskList()
  projectObject.getTasks().forEach((task) => displayTask(task))
  changeTaskListHeader(projectObject.name)
  setCurrentlyDisplayedProject(projectObject)
}

function createProjectDomElement(projectObject) {
  const projElement = document.createElement('div')
  projElement.innerText = projectObject.name
  projElement.classList.add('project')
  projElement.setAttribute('id', projectObject.id)
  projElement.addEventListener(
    'click',
    displayProjectWithTasksOnDOMEventListener
  )
  return projElement
}

function addProject(name) {
  const newProj = makeProject(name)
  allProjects.push(newProj)
  projectListDOM.prepend(createProjectDomElement(newProj))
  return newProj
}

function deleteProject(id) {
  document.querySelector(`.project[id="${id}"]`).remove
  allProjects.splice(
    allProjects.findIndex(project => project.id == id)
    , 1)
}

function addTaskToCurrentProject(taskObj) {
  currentlyDisplayedProject.addTaskFromObject(taskObj)
  refreshTasksDOM()
}

function refreshTasksDOM() {
  displayProjectWithTasksOnDOM(currentlyDisplayedProject)
}

function displayAllTasks() {
  removeDOMElementsInTaskList()
  changeTaskListHeader('All Tasks')
  getAllTasks().forEach((task) => displayTask(task))
}

export {
  createTaskDomElement,
  addProject,
  displayProjectWithTasksOnDOM,
  addTaskToCurrentProject,
  displayAllTasks,
  deleteProject
}

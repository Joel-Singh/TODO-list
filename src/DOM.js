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
  task.setAttribute('data-task-id', taskObject.id)

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

  const confirmEditBtn = document.createElement('button')
  confirmEditBtn.classList.add('confirm-edit-btn')
  confirmEditBtn.setAttribute('type', 'button')
  confirmEditBtn.setAttribute('style', 'display: none')
  confirmEditBtn.innerText = 'Confirm'

  const allElements = [title, btnWrapper, dueDate, description, confirmEditBtn]

  task.append(...allElements)
  return task
}

function convertTaskElementToEditable(UneditableTaskElementId) {
  let task = `.task[data-task-id="${UneditableTaskElementId}"]`
  let title = document.querySelector(`${task} .title`)
  let dueDate = document.querySelector(`${task} .due-date`)
  let description = document.querySelector(`${task} .description`)
  let confirmEditBtn = document.querySelector(`${task} .confirm-edit-btn`)

  let editableTitle = document.createElement('input')
  editableTitle.setAttribute('type', 'text')
  editableTitle.setAttribute('value', title.textContent)
  editableTitle.setAttribute('class', title.getAttribute('class'))

  let editableDueDate = document.createElement('input')
  editableDueDate.setAttribute('type', 'date')
  editableDueDate.value = dueDate.textContent
  editableDueDate.setAttribute('class', dueDate.getAttribute('class'))

  let editableDescription = document.createElement('textarea')
  editableDescription.value = description.textContent
  editableDescription.setAttribute('class', description.getAttribute('class'))

  title      .replaceWith(editableTitle)
  dueDate    .replaceWith(editableDueDate)
  description.replaceWith(editableDescription)

  confirmEditBtn.setAttribute('style', '')
}

function convertTaskElementToUneditable(editableTaskElementId) {
  let task = `.task[data-task-id="${editableTaskElementId}"]`
  let title = document.querySelector(`${task} .title`)
  let dueDate = document.querySelector(`${task} .due-date`)
  let description = document.querySelector(`${task} .description`)
  let confirmEditBtn = document.querySelector(`${task} .confirm-edit-btn`)

  function returnDifferentTagButSameTextAndClass(newTag, oldElement) {
    let newElement = document.createElement(newTag)
    newElement.textContent = oldElement.value
    newElement.setAttribute('class', oldElement.getAttribute('class'))
    return newElement
  }

  title      .replaceWith(returnDifferentTagButSameTextAndClass('span', title))
  dueDate    .replaceWith(returnDifferentTagButSameTextAndClass('span', dueDate))
  description.replaceWith(returnDifferentTagButSameTextAndClass('span', description))

  confirmEditBtn.setAttribute('style', 'display: none')
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
  const wrapper = document.createElement('div')
  wrapper.classList.add('project')

  const projElement = document.createElement('span')
  projElement.innerText = projectObject.name
  projElement.addEventListener(
    'click',
    displayProjectWithTasksOnDOMEventListener
  )

  const removeProjBtn = document.createElement('button')
  removeProjBtn.setAttribute('type', 'button')
  removeProjBtn.addEventListener('click', (e) => deleteProject(e.target.getAttribute('data-project-id')))
  removeProjBtn.innerText = 'R'

  let elementArr = [wrapper, projElement, removeProjBtn]
    elementArr.forEach(
      e => e.setAttribute('data-project-id', projectObject.id)
    );

  wrapper.append(projElement, removeProjBtn)
  return wrapper
}

function addProject(name) {
  const newProj = makeProject(name)
  allProjects.push(newProj)
  projectListDOM.prepend(createProjectDomElement(newProj))
  return newProj
}

function deleteProject(id) {
  document.querySelector(`.project[data-project-id="${id}"]`).remove()
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

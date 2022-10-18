import { getProject, getTask, makeTask } from './project.js'
import {
  displayProjectWithTasksOnDOM,
  addProject,
  createTaskDomElement,
} from './DOM.js'

function displayProjectWithTasksOnDOMEventListener(e) {
  displayProjectWithTasksOnDOM(getProject(e.target.getAttribute('id')))
}

function newProjectEventListeners() {
  const insNewProjName = document.querySelector('.insert-new-project-name')
  const confirmBtn = document.querySelector('.confirm-btn')
  const newProjectBtn = document.querySelector('#new-project')
  newProjectBtn.addEventListener('click', () => {
    newProjectBtn.setAttribute('style', 'display: none')
    insNewProjName.setAttribute('style', 'display: flex')
  })

  confirmBtn.addEventListener('click', () => {
    newProjectBtn.setAttribute('style', 'display: block')
    insNewProjName.setAttribute('style', 'display: none')
    addProject(document.querySelector('.new-project-name-input').value)
  })
}

function priorityBtnEventListener(priority, taskElement) {
  taskElement.classList.remove('not-urgent-task')
  taskElement.classList.remove('urgent-task')
  taskElement.classList.remove('very-urgent-task')
  taskElement.classList.add(priority + '-task')
  if (!taskElement.classList.contains('new-task-input')) {
    getTask(taskElement.getAttribute('id')).priority = priority
  }
}

function addNewTaskEventListeners() {
  const newTaskBtn = document.querySelector('.new-task-btn')
  const newTaskInput = document.querySelector('.new-task-input')
  const confirmNewTask = document.querySelector('.confirm-new-task')
  newTaskBtn.addEventListener('click', () => {
    newTaskBtn.setAttribute('style', 'display: none')
    newTaskInput.setAttribute('style', 'display: grid')
  })

  confirmNewTask.addEventListener('click', () => {
    newTaskBtn.setAttribute('style', 'display: grid')
    newTaskInput.setAttribute('style', 'display: none')
  })
}

export {
  addNewTaskEventListeners,
  displayProjectWithTasksOnDOMEventListener,
  newProjectEventListeners,
  priorityBtnEventListener,
}

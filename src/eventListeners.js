import { getProject, getTask, makeTask } from './project.js'
import {
  displayProjectWithTasksOnDOM,
  addProject,
  addTaskToCurrentProject,
  convertTaskElementToUneditable,
  convertTaskElementToEditable,
} from './DOM.js'

function displayProjectWithTasksOnDOMEventListener(e) {
  displayProjectWithTasksOnDOM(
    getProject(e.target.getAttribute('data-project-id'))
  )
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
    getTask(taskElement.getAttribute('data-task-id')).priority = priority
  }
}

function getPriorityFromDomTask(domTask) {
  if (domTask.classList.contains('not-urgent-task')) {
    return 'not-urgent'
  } else if (domTask.classList.contains('urgent-task')) {
    return 'urgent'
  } else if (domTask.classList.contains('very-urgent-task')) {
    return 'very-urgent'
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
    const titleValue = document.querySelector('.new-task-input .title').value
    const descriptionValue = document.querySelector(
      '.new-task-input .description'
    ).value
    const dueDateValue = document.querySelector(
      '.new-task-input input[type="date"]'
    ).value

    let priorityValue = getPriorityFromDomTask(newTaskInput)

    addTaskToCurrentProject(
      makeTask(titleValue, descriptionValue, dueDateValue, priorityValue)
    )
  })
}

function confirmEditEventListener(e) {
  let id = e.target.getAttribute('data-task-id')
  let objectTask = getTask(id)
  let taskSelectorString = `.task[data-task-id="${id}"]`
  let domTask = document.querySelector(taskSelectorString)

  let title = document.querySelector(`${taskSelectorString} .title`)
  let dueDate = document.querySelector(`${taskSelectorString} .due-date`)
  let description = document.querySelector(`${taskSelectorString} .description`)
  let confirmEditBtn = document.querySelector(
    `${taskSelectorString} .confirm-edit-btn`
  )

  objectTask.title = title.value
  objectTask.description = description.value
  objectTask.dueDate = dueDate.value
  objectTask.priority = getPriorityFromDomTask(domTask)

  convertTaskElementToUneditable(domTask)
  domTask.addEventListener('click', convertTaskElementToEditableEventListener)
}

const convertTaskElementToEditableEventListener = (event) => {
  if (
    event.target.classList.contains('task') ||
    event.target.classList.contains('title') ||
    event.target.classList.contains('due-date') ||
    event.target.classList.contains('description')
  ) {
    const domTask = event.target.closest('.task')
    convertTaskElementToEditable(domTask)
    domTask.removeEventListener(
      'click',
      convertTaskElementToEditableEventListener
    )
  }
}

export {
  addNewTaskEventListeners,
  displayProjectWithTasksOnDOMEventListener,
  newProjectEventListeners,
  priorityBtnEventListener,
  confirmEditEventListener,
  convertTaskElementToEditableEventListener,
}

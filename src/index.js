import { addProject, displayProjectWithTasksOnDOM, displayAllTasks } from './DOM.js'
import { addNewTaskEventListeners, newProjectEventListeners, priorityBtnEventListener } from './eventListeners.js'
import { loadAllProjects, storeAllProjects } from './storage.js'

newProjectEventListeners()
addNewTaskEventListeners()

const newTaskInput = document.querySelector('.new-task-input')
document.querySelector('.new-task-input .not-urgent-btn')
  .addEventListener('click', priorityBtnEventListener.bind(null, 'not-urgent', newTaskInput))
document.querySelector('.new-task-input .urgent-btn')
  .addEventListener('click', priorityBtnEventListener.bind(null, 'urgent', newTaskInput))
document.querySelector('.new-task-input .very-urgent-btn')
  .addEventListener('click', priorityBtnEventListener.bind(null, 'very-urgent', newTaskInput))

document.querySelector('.all-tasks-btn')
  .addEventListener('click', displayAllTasks)

document.querySelector('.clear-local-storage-btn')
  .addEventListener('click', () => localStorage.clear())
document.querySelector('.save-to-local-storage-btn')
  .addEventListener('click', storeAllProjects)
document.querySelector('.load-from-local-storage')
  .addEventListener('click', loadAllProjects)

const defaultProject = addProject('Default Project')
defaultProject.addTask(`Wash the dishes`, `The dishes haven't been washed and the damn roommates won't do em`, `2019-08-13`, `not-urgent`)
defaultProject.addTask(`Complete Module 1.05 for precalculus`, `Has to do with calculating the derivative, finding the slope of y=mx+b, and other math sounding words`, `2022-10-18`, `urgent`)
defaultProject.addTask(`Complete Unit 3 Exam for my online economics class`, `Need to review supply and demand first`, `2022-10-19`, `very-urgent`)
displayProjectWithTasksOnDOM(defaultProject)


const anotherProject = addProject('Another Project')
anotherProject.addTask(`2Wash the dishes`, `The dishes haven't been washed and the damn roommates won't do em`, `2022-8-4`, `not-urgent`)
anotherProject.addTask(`2Complete Module 1.05 for precalculus`, `Has to do with calculating the derivative, finding the slope of y=mx+b, and other math sounding words`, `2013-4-27`, `urgent`)
anotherProject.addTask(`2Complete Unit 3 Exam for my online economics class`, `Need to review supply and demand first`, `2022-10-19`, `very-urgent`)

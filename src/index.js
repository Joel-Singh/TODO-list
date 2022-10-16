import { addProject, displayProjectWithTasksOnDOM } from './DOM.js'
import { addNewTaskEventListeners, newProjectEventListeners } from './eventListeners.js'

newProjectEventListeners()
addNewTaskEventListeners()

const defaultProject = addProject('Default Project')
defaultProject.addTask(`Wash the dishes`, `The dishes haven't been washed and the damn roommates won't do em`, `10/15/2022`, `not-urgent`)
defaultProject.addTask(`Complete Module 1.05 for precalculus`, `Has to do with calculating the derivative, finding the slope of y=mx+b, and other math sounding words`, `10/18/2022`, `urgent`)
defaultProject.addTask(`Complete Unit 3 Exam for my online economics class`, `Need to review supply and demand first`, `10/19/2022`, `very-urgent`)
displayProjectWithTasksOnDOM(defaultProject)

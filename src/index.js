import { addProject } from './DOM.js'
import { addNewTaskEventListeners, newProjectEventListeners } from './eventListeners.js'

newProjectEventListeners()
addNewTaskEventListeners()
addProject('balls')

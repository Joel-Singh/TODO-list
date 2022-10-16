import { addProject } from './DOM.js'
import { addNewTaskEventListener, newProjectEventListeners } from './eventListeners.js'

newProjectEventListeners()
addNewTaskEventListener()
addProject('balls')

import { allProjects } from "./globalVariables"
import { displayTasksOnDOM, addProject } from "./DOM.js"

function displayTasksOnDOMEventListener(e) {
  displayTasksOnDOM(
    allProjects.find((project) => {
      return project.id == e.target.getAttribute('id')
    })
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

export { displayTasksOnDOMEventListener, newProjectEventListeners }

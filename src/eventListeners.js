import { allProjects } from "./globalVariables"
import { displayTasksOnDOM } from "./DOM.js"

function displayTasksOnDOMEventListener(e) {
  displayTasksOnDOM(
    allProjects.find((project) => {
      return project.id == e.target.getAttribute('id')
    })
  )
}

export { displayTasksOnDOMEventListener }

const allProjects = []
let currentlyDisplayedProject = null

// I don't know how else to create a exported variable that is mutable
function setCurrentlyDisplayedProject(project) {
  currentlyDisplayedProject = project;
}

export { allProjects, currentlyDisplayedProject, setCurrentlyDisplayedProject }

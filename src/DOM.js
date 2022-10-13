const newTaskBtn = document.querySelector('.new-task-btn')
function createTaskDomElement(taskObject) {
  const task = document.createElement('div')
  task.classList.add('task')
  task.classList.add('open')
  task.classList.add(taskObject.priority + '-task')

  const title = document.createElement('span')
  title.classList.add('title')
  title.innerText = taskObject.title

  const btnWrapper = document.createElement('div')
  btnWrapper.classList.add('priority-btn-wrapper')

  const notUrgentBtn = document.createElement('button')
  notUrgentBtn.classList.add('not-urgent-btn')
  const urgentBtn = document.createElement('button')
  urgentBtn.classList.add('urgent-btn')
  const veryUrgentBtn = document.createElement('button')
  veryUrgentBtn.classList.add('very-urgent-btn')

  btnWrapper.append(notUrgentBtn, urgentBtn, veryUrgentBtn)

  const dueDate = document.createElement('span')
  dueDate.classList.add('due-date')
  dueDate.innerText = taskObject.dueDate

  const description = document.createElement('span')
  description.classList.add('description')
  description.innerText = taskObject.description

  task.append(title, btnWrapper, dueDate, description)
  return task
}

function displayTasksOnDom(projectObject) {
  projectObject.getTasks().forEach((task) => {
    newTaskBtn.after(task.createDomElement())
  })
}

export { createTaskDomElement }

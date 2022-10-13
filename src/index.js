
const newProjectBtn = document.querySelector('#new-project')
const insNewProjName = document.querySelector('.insert-new-project-name')
const confirmBtn = document.querySelector('.confirm-btn')

function setUpEventListeners() {
  newProjectBtn.addEventListener('click', () => {
    newProjectBtn.setAttribute('style', 'display: none')
    insNewProjName.setAttribute('style', 'display: flex')
  })

  confirmBtn.addEventListener('click', () => {
    newProjectBtn.setAttribute('style', 'display: block')
    insNewProjName.setAttribute('style', 'display: none')
  })
}

setUpEventListeners();

document.addEventListener('DOMContentLoaded', () => {
  const monsterUrl = 'http://localhost:3000/monsters/'
  const monsterContainer = document.querySelector('#monster-container')
  const formContainer = document.querySelector('#create-monster')
  let pageNum = 1

  const monsterData = () => {
    fetch(monsterUrl + `?_limit=50&_page=${pageNum}`)
      .then(response => response.json())
      .then(monsters => renderMonsters(monsters))
  }

  const renderMonsters = monsters => {
    for (const monster of monsters) {
      renderMonster(monster)
    }
  }

  const renderMonster = (monster) => {
    const div = document.createElement('div')

    div.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
    `

    monsterContainer.appendChild(div)
  }

  const createMonster = () => {
    const form = document.createElement('form')
    form.id = 'monster-form'

    form.innerHTML = `
      <input id="name" type="text" placeholder="name...">
      <input id="age" type="number" placeholder="age...">
      <input id="description" type="text" placeholder="description...">
      <button>Create</button>
    `

    formContainer.appendChild(form)

    const monsterForm = document.querySelector('#monster-form')

    monsterForm.addEventListener('submit', e => {
      e.preventDefault()

      const nameData = monsterForm.querySelector('#name').value
      const ageData = monsterForm.querySelector('#age').value
      const descriptionData = monsterForm.querySelector('#description').value

      const monster = {
        name: nameData,
        age: ageData,
        description: descriptionData
      }

      monsterForm.reset()

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(monster)
      }

      fetch(monsterUrl, options)
        .then(response => response.json())
        .then(renderMonster)

    })
  }

  const pageNavigation = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('#back')) {
        pageDown()
      }
      if (e.target.matches('#forward')) {
        pageUp()
      }
    })
  }

  const pageDown = () => {
    1 < pageNum ? (pageNum--, monsterData(pageNum)) : alert("Ain't no monsters here!")
  }

  const pageUp = () => {
    pageNum++, monsterData(pageNum)
  }

  pageNavigation()
  createMonster()
  monsterData()
})
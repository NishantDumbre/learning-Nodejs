let name = document.getElementById('name')
let phone = document.getElementById('phone')
let email = document.getElementById('email')
let list = document.getElementById('list')
let submitForm = document.getElementById('submitForm')
let form = document.querySelector('form')

submitForm.addEventListener('click', formSubmit)
window.addEventListener('DOMContentLoaded', populateData)
list.addEventListener('click', deleteElement)
list.addEventListener('click', updateElement)


function formSubmit(e) {
    e.preventDefault()

    let obj = {
        name: name.value,
        phone: phone.value,
        email: email.value
    }

    axios.post('http://localhost:3000', obj)
        .then(result => {
            console.log(result.data.id)
            showUser(result.data)
        })
}


function showUser(users) {
    let li = document.createElement('li')
    li.innerHTML = `${users.name}  ${users.phone}  ${users.email}  <button id="delete" class="delete">Delete</button><button id="update" class="update">Update</button>`
    li.id = users.id
    list.appendChild(li)
}


function populateData() {
    axios.get('http://localhost:3000')
        .then((result) => {
            for (let data of result.data) {
                showUser(data)
            }
        })
}

function deleteElement(e) {
    if (e.target.classList.contains('delete')) {
        let listElement = e.target.parentElement
        list.removeChild(listElement)
        axios.delete(`http://localhost:3000/${listElement.id}`)
            .then((result) => {
                // list.removeChild(listElement)
                //this block wasn't hitting
            })
    }
}

function updateElement(e) {
    if (e.target.classList.contains('update')) {
        let listElement = e.target.parentElement
        console.log(true)
       

        
        axios.get(`http://localhost:3000/${listElement.id}`)
            .then((result) => {
                name.value = result.data[0].name
                phone.value = result.data[0].phone
                email.value = result.data[0].email
                console.log(listElement)
                list.removeChild(listElement)
                submitForm.style.display = 'none'
                let editButton = document.createElement('button')
                editButton.innerHTML = 'Update user'
                editButton.onclick = updateUser
                submitForm.insertAdjacentElement('afterend', editButton)
            })

        function updateUser() {
            console.log('update user')
            let name = document.getElementById('name')
            let phone = document.getElementById('phone')
            let email = document.getElementById('email')
            let obj = {
                name: name.value,
                phone: phone.value,
                email: email.value
            }
            
            console.log(obj)
            axios.put(`http://localhost:3000/${listElement.id}`,obj)
                .then(result=>{
                    showUser(result.data)
                })
        }
    }
}


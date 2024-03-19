let submitForm = document.getElementById('submitForm')
let expenseList = document.querySelector('#expenseList')
let expenseWindow = document.getElementById('expenseWindow')

submitForm.addEventListener('click', formSubmit)
expenseList.addEventListener('click', deleteItem)
expenseList.addEventListener('click', editItem)


let expense = document.getElementById('expense')
let description = document.getElementById('description')
let category = document.getElementById('category')


function commonInstance() {
    return axios.create({
        baseURL: 'http://localhost:8080'
    })
}


function showExpensesOnScreen(obj) {
    let img     // Choosing the image as per condition
    if (obj.category == 'Food') img = './images/food.jpg'
    else if (obj.category == 'Travel') img = './images/plane.jpg'
    else img = './images/movie.jpg'

    let newChild = document.createElement('div')    // Creating div
    newChild.className = 'card col-2'
    newChild.id = obj.id
    newChild.innerHTML = `<img src=${img} class="card-img-top" alt="">
<div class="card-body">
  <h5 class="card-title">₹${obj.expense}</h5>
  <p class="card-text">${obj.description}</p>
  <button class="btn btn-primary delete">Delete</button>
  <button class="btn btn-primary edit">Edit</button>
</div>`
    expenseList.appendChild(newChild)
}


//Add items
function formSubmit(e) {
    e.preventDefault()

    if (expense.value && description.value) {
        let obj = {
            expense: expense.value,
            description: description.value,
            category: category.value
        }
        commonInstance().post('http://localhost:8080', obj)
            .then((result) => {
                console.log(result.data)
                showExpensesOnScreen(result.data)
                alert('add')    // Alert message successful
            })
            .catch((err) => console.log(err))
    }
    else {
        alert('blank')      // Alert message if fields are blank
    }
}

//Delete items
function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
        let element = e.target.parentElement.parentElement
        let id = e.target.parentElement.parentElement.id
        commonInstance().delete(`/${id}`)
            .then((res) => {
                console.log('item deleted')
                expenseList.removeChild(element)
                alert('delete')
            })
    }
}

//Edit items
function editItem(e) {
    if (e.target.classList.contains('edit')) {
        let obj = e.target.parentElement.parentElement

        commonInstance().get(`/${obj.id}`)
        .then((result) => {
            expense.value = result.data[0].expense
            description.value = result.data[0].description
            category.value = result.data[0].category
            expenseList.removeChild(obj)
            submitForm.style.display = 'none'
            let editButton = document.createElement('button')
            editButton.innerHTML = 'Update user'
            editButton.onclick = updateUser
            editButton.classList="btn btn-primary btn-outline-warning"
            submitForm.insertAdjacentElement('afterend', editButton)
        })

    function updateUser() {
        console.log('update user')
        // let expense = document.getElementById('name')
        // let description = document.getElementById('phone')
        // let category = document.getElementById('email')
        // let item = {
        //     expense: expense.value,
        //     description: description.value,
        //     category: category.value
        // }
        // console.log(item,obj.id)
        // commonInstance().put(`/${obj.id}`,item)
        //     .then(result=>{
        //         showExpensesOnScreen(result.data)
        //         alert('edit')
        //     })
    }

    }
}


function alert(type) {
    let alert = document.createElement('div')    // Creating alert
    alert.style = "margin-top:3%;padding:2%"
    alert.id = 'alert'
    if (type == 'add') {
        alert.innerHTML = `<h3 style="background-color: green ;color:white;">Added Successfully</h3>`
    }
    else if (type == 'delete') {
        alert.innerHTML = `<h3 style="background-color: yellow ;color:red;">Deleted Successfully</h3>`
    }
    else if (type == 'edit') {
        alert.innerHTML = `<h3 style="background-color: aqua ;color:black;">Ready to Edit</h3>`
    }
    else if (type == 'blank') {
        alert.innerHTML = `<h3 style="background-color: yellow;color:red;">Please fill all details</h3>`
    }

    expenseWindow.appendChild(alert)

    setTimeout(function () {    // Removing alert after 2 seconds
        expenseWindow.removeChild(alert)
    }, 2000)
}

function errorHandling(err) {
    if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
        if (err.response.status === 404) {
            alert('Error 404 Page not found')
        }
    }
    else if (err.request) {
        console.log(err.request)
    }
    else {
        console.log(err.message)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    commonInstance().get('/')
        .then((res) => {
            for(let data of res.data){
                console.log('refreshed')
                showExpensesOnScreen(data)
            }
        })
})
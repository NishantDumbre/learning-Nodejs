let title = document.getElementById('title')
let author = document.getElementById('author')
let content = document.getElementById('content')
let blogs = document.getElementById('blogs')
let submitForm = document.getElementById('submitForm')

submitForm.addEventListener('click', createBlog)
window.addEventListener('DOMContentLoaded', populateBlogs)
window.addEventListener('DOMContentLoaded', getComments)
blogs.addEventListener('click', deleteBlogs)
blogs.addEventListener('click', addComment)
blogs.addEventListener('click', deleteComments)


function createBlog(e) {
    e.preventDefault()
    console.log(true)

    let obj = {
        title: title.value,
        author: author.value,
        content: content.value
    }
    axios.post('http://localhost:8080', obj)
        .then((result) => {
            console.log(result.data)
            showBlogs(result.data)
        })
}


async function showBlogs(data) {
    let newBlog = document.createElement('li')
    newBlog.innerHTML = `<h4>${data.title}</h4>
    <h5>${data.author}</h5>
    <p>${data.content}</p>
    <ul>
    </ul>
    <form action="">
        <label for="">Write a comment</label>
        <input type="text">
        <button type="button" class="addComment">Add comment</button>
    </form>
    <button type="button" class="deleteBlogs">Delete Blog</button>`
    newBlog.id = data.id
    blogs.appendChild(newBlog)
}

function addComment(e) {
    if (e.target.classList.contains('addComment')) {
        let blogId = e.target.parentElement.parentElement.id
        let list = e.target.parentElement.parentElement.querySelector('ul')
        const commentValue = e.target.previousElementSibling.value
        const obj = {
            commentValue
        }
        
        console.log(obj)
        axios.post(`http://localhost:8080/${blogId}`, obj)
            .then((result) => {
                let newComment = document.createElement('li')
        newComment.innerHTML = `<p>${commentValue}</p>
                <button type="button" class="deleteComments">Delete Comment</button>`
        list.appendChild(newComment)
            })
    }
}

function populateBlogs() {
    axios.get('http://localhost:8080')
        .then(async (result) => {
            for (let data of result.data) {
                await showBlogs(data)
                addComment()
            }
        })
}

function getComments(){
    axios.get('http://localhost:8080')
        .then((result)=>{
            console.log(result.data)
        })
}

function deleteBlogs(e) {
    if (e.target.classList.contains('deleteBlogs')) {
        let removeBlog = e.target.parentElement
        axios.delete(`http://localhost:8080/${removeBlog.id}`)
            .then(() => {
                blogs.removeChild(removeBlog)
            })
    }
}


function deleteComments(e) {
    if (e.target.classList.contains('deleteComments')) {
        let removeComment = e.target.parentElement
        removeComment.remove()
        axios.delete(`http://localhost:8080/${removeComment.id}`)
            .then(() => {
                removeComment.remove()
            })
    }
}


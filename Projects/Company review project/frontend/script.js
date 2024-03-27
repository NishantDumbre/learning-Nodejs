let company = document.getElementById('company')
let pros = document.getElementById('pros')
let cons = document.getElementById('cons')
let search = document.getElementById('search')
//let reviews = document.getElementById('reviews')
let submitForm = document.getElementById('submitForm')
let searchCompany = document.getElementById('searchCompany')

submitForm.addEventListener('click', createReview)
searchCompany.addEventListener('click', searchCompanyReviews)
//reviews.addEventListener('click', deleteReviews)



function createReview(e) {
    e.preventDefault()
    console.log(true)

    let obj = {
        company: company.value,
        pros: pros.value,
        cons: cons.value
    }
    axios.post('http://localhost:8080', obj)
        .then((result) => {
            console.log(result.data)
            console.log('Review posted successfully')
            //showReviews(result.data)
        })
}

function searchCompanyReviews(){
    let searchFilter = {
        company: search.value
    }
    
    axios.get(`http://localhost:8080/${search.value}`)
        .then((company)=>{
            for(let data of company.data){
                showReviews(data)
            }
            
        })
}


function showReviews(data) {
    let newReview = document.createElement('li')
    newReview.innerHTML = `<h4>Pros</h4>
    <p>${data.pros}</p>
    <h4>Cons</h4>
    <p>${data.cons}</p>
    <h4>Rating</h4>`
    newReview.id = data.id
    reviews.appendChild(newReview)
}

// function addComment(e) {
//     if (e.target.classList.contains('addComment')) {
//         let blogId = e.target.parentElement.parentElement.id
//         let list = e.target.parentElement.parentElement.querySelector('ul')
//         const commentValue = e.target.previousElementSibling.value
//         const obj = {
//             commentValue
//         }
        
//         console.log(obj)
//         axios.post(`http://localhost:8080/${blogId}`, obj)
//             .then((result) => {
//                 let newComment = document.createElement('li')
//         newComment.innerHTML = `<p>${commentValue}</p>
//                 <button type="button" class="deleteComments">Delete Comment</button>`
//         list.appendChild(newComment)
//             })
//     }
// }





// function populateReviews() {
//     axios.get('http://localhost:8080')
//         .then(async (result) => {
//             for (let data of result.data) {
//                 await showReviews(data)
//                 addComment()
//             }
//         })
// }




// function deleteReviews(e) {
//     if (e.target.classList.contains('deletereviews')) {
//         let removeBlog = e.target.parentElement
//         axios.delete(`http://localhost:8080/${removeBlog.id}`)
//             .then(() => {
//                 reviews.removeChild(removeBlog)
//             })
//     }
// }



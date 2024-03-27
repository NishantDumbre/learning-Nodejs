const Company = require('../models/companyModels')
const Reviews = require('../models/reviewModels')


exports.postReviews = (req,res,next) =>{
    Reviews.create({
        company:req.body.company,
        pros:req.body.pros,
        cons:req.body.cons
    })
        .then((response)=>{
            res.json(response.dataValues)
        })
}


exports.getReviews = (req,res,next) =>{
    let company = req.params.company
    //console.log(id)
    Reviews.findAll({where:{company}})
        .then((blogs)=>{
            const arr = []
            for(let data of blogs){
                arr.push(data.dataValues)
            }
            res.json(arr)
        })
}


// exports.deleteBlogs = (req,res,next) =>{
//     const blogId = req.params.id
//     Blogs.destroy({where:{id:blogId}})
//         .then((response)=>{
//             res.json(response)
//         })
// }

// exports.addComments = (req,res,next) =>{
//     const blogId = req.params.id
//     const commentValue = req.body.commentValue
//     Blogs.findByPk(blogId)
//         .then((blog)=>{
//             return Comments.create({
//                 comment:commentValue,
//                 blogId:blogId
//             })
//         })
//         .then((result)=>{
//             res.json(result)
//         })
//         .catch(err=>console.log(err))
// }





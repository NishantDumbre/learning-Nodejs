const Blogs = require('../models/blogModels')
const Comments = require('../models/commentModels')


exports.getBlogs = (req,res,next) =>{
    Blogs.findAll()
        .then((blogs)=>{
            res.json(blogs)
        })
}

exports.postBlogs = (req,res,next) =>{
    Blogs.create({
        title:req.body.title,
        author:req.body.author,
        content:req.body.content
    })
        .then((response)=>{
            res.json(response.dataValues)
        })
}

exports.deleteBlogs = (req,res,next) =>{
    const blogId = req.params.id
    Blogs.destroy({where:{id:blogId}})
        .then((response)=>{
            res.json(response)
        })
}

exports.addComments = (req,res,next) =>{
    const blogId = req.params.id
    const commentValue = req.body.commentValue
    Blogs.findByPk(blogId)
        .then((blog)=>{
            return Comments.create({
                comment:commentValue,
                blogId:blogId
            })
        })
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
}

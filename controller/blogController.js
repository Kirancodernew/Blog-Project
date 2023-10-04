
const Blog=require('../modules/blog');

const blog_index=(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('blogs/index',{ title: 'All Blogs',blogs: result});
    })
    .catch((err)=>{
        console.log(err)
    })
};

const blog_create=(req,res)=>{
    res.render('blogs/create',{ title: 'Create Blog'});
};

const blog_create_post= (req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    })
};

const blog_by_Id = (req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('blogs/details',{title:'Blog Details', blogs:result});
    })
    .catch((err)=>{
        res.status(404).render('404',{ title: 'Error'});
    });
};

const blog_to_delete = (req,res) =>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/'});
    })
    .catch((err)=>{
        console.log(err);
    })
};

module.exports= {
    blog_index,
    blog_create,
    blog_by_Id,
    blog_create_post,
    blog_to_delete
};
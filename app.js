const express=require('express');
const _ = require('lodash');
const app = express();
const blogRoutes= require('./routers/router');
const mongoose=require('mongoose');
const dbURI='mongodb+srv://saikiranbheempur:saikiranrathod@rathodtest.txfrhmk.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser : true, useUnifiedTopology: true})
    .then((result)=>app.listen(3000))
    .catch((err)=> console.log(err))


//register ejs view engine:
app.set('view engine','ejs');

const morgan= require('morgan');
//link to the static files using express:
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
//third paty middlewar:
// app.use(morgan('dev'));
// app.use(morgan('tiny'));

app.get('/add-blog',(req,res)=>{
    const blog= new Blog({
        title: 'New Blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
});
app.get('/all-blog',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>console.log(err))
});
// app.use((req,res,next)=>{
    //     console.log(req.path);
    //     console.log(req.method);
    //     console.log(req.hostname);
    //     next();
    // });
    // app.use((req,res,next)=>{
        //     console.log('second middleware envoke');
        //     next();
        // })
app.get('/',(req,res)=>{
    res.redirect('/blogs');
});
app.get('/about',(req,res)=>{
    res.render('about',{ title: 'About'});
});

app.use('/blogs',blogRoutes);
app.use((req,res)=>{
    res.status(404).render('404',{ title: 'Error'});
});


// app.get('/single-blog',(req,res)=>{
//     Blog.findById('6516ff330acc56b440299620')
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>console.log(err))
// });
    
    
    
/*app.get('/',(req,res)=>{
    // res.send('<p>Home Page!</>');
    // console.log(__dirname);
    // res.sendFile('./views/index.html',{root:__dirname});
    //using view engine ejs:
    res.render('index',{ title: 'Home'});
});
app.get('/about',(req,res)=>{
    // res.send('<p>About Page!</p>');
    // res.sendFile('./views/about.html',{root:__dirname});
    // using view engine ejs:
    res.render('about',{ title: 'About'});

});
app.get('/blogs/create',(req,res)=>{
    res.render('create',{ title: 'Create'});
});
//redirect:
// app.get('/about-me',(req,res)=>{
//     res.redirect('/about');
// });

//404 page midware:
app.use((req,res)=>{
    // res.sendFile('./views/404.html',{root: __dirname});
    res.status(404).render('404');
})*/
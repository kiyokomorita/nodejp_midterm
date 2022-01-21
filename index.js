const express =require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');
// const { Mongoose } = require('mongoose');
// Mongoose.connect("mongodb+srv://kiyoko:<password>@cluster0.zduqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


let blogs=[
  {
    id:uuid(),
    blogTitle:'This is my first blog',
    blog:'Lorem ipsum dolor sit amet.',
    blogImg:'https://source.unsplash.com/random/50×50'
  },
  {
    id:uuid(),
    blogTitle:'This is my second blog',
    blog:'Placeat hic esse odio asperiores debitis aspernatur saepe aut inventore quas n',
    
  },
  {
    id:uuid(),
    blogTitle:'This is my Third blog',
    blog:'obis beatae illo ad eveniet, cumque modi dolores officia fugiat recusandae!',
    blogImg:'https://source.unsplash.com/random/?nature/50×50'
  },

{
  id:uuid(),
  blogTitle:'This is my fourth blog',
  blog:'Sooooo tired!!!.',
  blogImg:'https://source.unsplash.com/random/50×50'
}

]

app.get('/', (req,res)=>{
  res.render('home')
})

app.get('/blogs', (req,res)=>{
  res.render('blogs/index', {blogs})
})

app.get('/blogs/new', (req,res)=>{
  res.render('blogs/new');
})

app.post('/blogs', (req,res)=>{
  const {blogTitle, blog} = req.body;
  blogs.push({blogTitle, blog,id:uuid()})
  res.redirect('/blogs');
})

app.get('/blogs/:id', (req,res)=>{
  const {id} = req.params;
  const blog = blogs.find(c =>c.id === id);
  res.render('blogs/show', {blog})

})
app.get('/blogs/:id/edit', (req,res)=>{
  const {id} = req.params;
  const blog = blogs.find(c =>c.id === id);
  res.render('blogs/edit', {blog})

})
app.patch('/blogs/:id', (req,res)=>{
  const {id} = req.params;
  const newblogText = req.body.blog;
  const foundBlog = blogs.find(c =>c.id === id);
  foundBlog.blog = newblogText;
  res.redirect('/blogs')
})

app.delete('/blogs/:id', (req,res)=>{
  const {id} = req.params;
  blogs = blogs.filter(c=>c.id !== id)
  res.redirect('/blogs');

})



app.get('/', (req,res)=>{
  res.render('home')
})


app.listen(3000, ()=>{
  console.log("LISTENING ON PORT 3000");
})
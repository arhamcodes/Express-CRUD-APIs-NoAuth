const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/models.js')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/users', async(req, res) => {
  try{
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({error: err.message})
  }
})

app.get('/user/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message})
    }
  })

app.post('/user', async(req, res) => {
    try {
    const user = await User.create(req.body)
    res.status(200).json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message})
    }
  })

app.put('/user/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!user) throw Error(res.status(404).json({message: 'User not found'}))
        res.status(200).json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message})
    }
})

 app.delete('/user/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) throw Error(res.status(404).json({message: 'User not found'}))
        res.status(200).json({message: 'User deleted'})
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message})
    }
 })

mongoose.connect('mongodb+srv://admin-2:admin@rest-apis-expressjs.sixojzu.mongodb.net/Rest-APIs?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{
        console.log('Server is running at port 3000')
    });
    console.log('Database connected')
}).catch((err)=>{
    console.log(err)
});
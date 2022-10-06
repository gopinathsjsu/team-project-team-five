const express  = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const app = express();

mongoose.connect("mongodb+srv://sahithibommadi:test@cluster0.j50fs2b.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    () => console.log('DB Connection established')
)

app.use(express.json());
app.post('/register',async (req, res) =>{
    try{
        const{username,email,password,confirmpassword} = req.body;
        let exist = await Registeruser.findOne({email:email})
        if(exist){
            return res.status(400).send('User Already Exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('Passwords are not matching');
        }
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('Registered Successfully')

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internal Server Error ')
    }
})

app.listen(5000,()=>{
    console.log('Server running...')
}
)
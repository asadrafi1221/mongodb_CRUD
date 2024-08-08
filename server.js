import express from "express";
import bodyParser from "body-parser";
import { user } from './userschema.js';
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
const app = express();
const port = 3000;


app.set('veiw engine','ejs');
app.set('views',path.resolve('./views'));
let data = await mongoose.connect('mongodb://localhost:27017/');


app.use(bodyParser.json());

app.get('/getdata', async (req, res) => {
    const data = await user.find();
    res.render('home.ejs',{data : data});
   

}).get('/getdata/:id', async (req, res) => {


    const id = Number(req.params.id);

    if (!id) {
        res.send('plz enter your data fisrt');
    }
    try {
        const isuserfinded = await user.find({ id: id });
        res.send(isuserfinded);
    }
    catch (err) {
        res.send('sorry no user founded');
    }


}).delete('/delete/:id', async (req, res) => {


    const userId = req.params.id;

    await user.deleteOne({ id: userId });
    const users = await user.find();

    res.send(users);


})
app.post('/create', (req, res) => {


    const { name, id, skills } = req.body;

    const newuser = new user({
        name: req.body.name,
        id: req.body.id,
        skills: req.body.skills || 'developer'
    });
    newuser.save();

    console.log('this time post route has been called okay');
    res.send('done creating user');


});
app.patch('/update/:id', async (req, res) => {



    const update_data = req.body;
    const userId = req.params.id;

    try {
        await user.updateOne({ id: userId }, { $set: update_data });
        const all_users = await user.find();
        res.send(all_users);
    } catch (err) {
        res.status(500).send(err);
    }

}).listen(port, () => {
    console.log(`app is listening on port no ${port}`);
});




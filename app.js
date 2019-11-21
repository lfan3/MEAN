const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`app is listening to PORT ${PORT}`);
})

mongoose.connect("mongodb://127.0.0.1:27017/test", {useUnifiedTopology:true, useNewUrlParser: true });

mongoose.connection.on("error", (err)=>{
    console.log("err", err);
})

mongoose.connection.on("connected", (err,res) => {
    console.log("mongoose is connected");
});

var kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    var greeting = this.name ? "my name is " + this.name : "I do not have name";
    console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({name: 'Silence'});
console.log(silence.name);

var fluffy = new Kitten({ name:'fluffy'});
fluffy.speak();

fluffy.save(function(err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
})

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Naveen:naveen50944047@cluster0.5cbta7e.mongodb.net/UserProblemDB?retryWrites=true&w=majority")

.then(()=>{
console.log("MongoDB Connected")
})

.catch((err)=>{
console.log(err)
})
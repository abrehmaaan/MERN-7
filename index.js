import mongoose, { mongo } from "mongoose";
import validator from "validator";
mongoose.connect("mongodb://localhost:27017/courses").then(()=>{
    console.log("Connection Established...");
}).catch((err)=>{
    console.log(err);
})

const bsCourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10,
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10,
    },
    videos: {
        type: Number,
        required: true,
        validate(value){
            if(value <= 0){
                throw new Error("Videos must be greater than Zero.")
            }
            if(validator.isFloat(value.toString())){
                console.log(value.toString())
                throw new Error("Videos must be a whole number.")
            }
        }
    },
    active: {
        type: Boolean,
        required: true
    }
})

const List = new mongoose.model("bscourse",bsCourseSchema);

const createDocument = async(courseList)=>{
    try{
        const res = await List.insertMany(courseList)
        console.log(res)
    }catch(err){
        console.log(err)
    }
}
const nodejs = new List({
    name: "NodeJS",
    type: "Backend",
    videos: 40,
    active: true,
})
const reactjs = new List({
    name: "ReactJS",
    type: "Frontend",
    videos: 50,
    active: true,
})
const expressjs = new List({
    name: "ExpressJS",
    type: "Backend",
    videos: 60,
    active: true,
})
const mongodb = new List({
    name: "MongoDB",
    type: "Database",
    videos: 30,
    active: true,
})
const coursesList = [reactjs, nodejs, expressjs, mongodb];

// createDocument(coursesList);

const updateDocument = async(condition, dict)=>{
    try{
        const res = await List.updateMany(condition,{$set: dict})
        console.log(res)
    }catch(err){
        console.log(err)
    }
}

// updateDocument({type: "Backend"}, {videos: 80});

const deleteDocument = async(condition)=>{
    try{
        const res = await List.deleteMany(condition)
        console.log(res)
    }catch(err){
        console.log(err)
    }
}

// deleteDocument({videos: 30});

const getDocument = async(condition = null)=>{
    try{
        if(condition==null){
            const res = await List.find()
            console.log(res)
        }
        else{
            const res = await List.find(condition)
            console.log(res)
        }
    }catch(err){
        console.log(err)
    }
}
// getDocument({$and: [{videos: {$gte: 50}},{videos: {$lte: 100}}]});

createDocument([expressjs])
// getDocument()
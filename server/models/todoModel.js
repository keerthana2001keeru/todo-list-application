const mongoose = require ('mongoose')

const TodoSchema = new mongoose.Schema({
task:{
    type:String,
    required: [true, "please enter a task"],
     },
done:{
    type:Boolean,
    default:false
},
createdAt: {
    type: Date,
    default: Date.now, 
  },
},
{
  timestamps: true, 
}

)

const TodoModel = mongoose.model("Todos",TodoSchema)
module.exports =TodoModel
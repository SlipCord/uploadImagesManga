let mongoose = require("mongoose");
let Schema = mongoose.Schema ;
let chapter = new Schema({
    manga:{
        type:Schema.Types.ObjectId ,
        ref:"manga"
    },
    numberChapter:Number,
    title:{
        type:String
    },
    url:{
        type:String
    },
    images:[
        {
            type:String
        }
    ],
    status_update_images:{
        type:Boolean,
    },
    createdAt:{ type: Date, default: Date.now }
})
let chapterModule =  mongoose.model('chapter',chapter);
export default chapterModule ;
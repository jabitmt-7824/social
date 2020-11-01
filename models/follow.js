const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for follow
const followSchema = new Schema({
     fromUser: {
         type: String,
         required: true
     },
     toUser: {
         type: String,
         required: true
     }
},
    {
        timestamps: true
    }
);

// create follow model
const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;

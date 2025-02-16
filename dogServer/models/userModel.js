const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: [true, 'Name required.'],
        unique: [true, 'Sorry! This name is not available anymore.'],
        minlength: [2, 'Must have atleast 2 characters'],
        maxlenght: [25, 'No more than 25 characters'],
        trim: true,
    },
    profilePic: {
        type: schema.Types.ObjectId,
        ref: 'favoriteImgs',
    }
});

module.exports = mongoose.model('dogAppUsers', userSchema);
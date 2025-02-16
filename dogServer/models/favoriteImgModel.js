const mongoose = require('mongoose');
const schema = mongoose.Schema;

const favorateImgSchema = new schema({
    imgSrc: {
        type: String,
        required: [true, 'Add image source'],
    },
    name: String,
    user: {
        type: schema.Types.ObjectId,
        ref: 'dogAppUsers',
        required: [true, 'Favorite of which user?'],
    },
});

module.exports = mongoose.model('favoriteImgs', favorateImgSchema);
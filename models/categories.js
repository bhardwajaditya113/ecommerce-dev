const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        default: 'uncategorized'
    }
});

mongoose.model('Categories', CategoriesSchema);

module.exports = CategoriesSchema;
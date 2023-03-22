const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.connect(process.env.ATLAS_URI, {});
        console.log("DB Connected Successfully!");
    } catch (err) {
        console.log("DB Connection Failed!");
    }
    
}
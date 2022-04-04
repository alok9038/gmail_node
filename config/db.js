var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/gmail',function(error){
    if(error){
        return console.log(error)
    }
    else{
        console.log('Database connected');
    }
})

module.exports = mongoose
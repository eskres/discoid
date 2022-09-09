const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlenght: [3, 'First Name must be more that 3 characters'],
        maxlenght: [15, 'First Name must be less that 15 characters']
    },
    lastName: {
        type: String,
        required: true,
        minlenght: [3, 'Last Name must be more that 3 characters'],
        maxlenght: [15, 'Last Name must be less that 15 characters']
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        //A unique index ensures that the indexed fields do not store duplicate values; i.e. enforces uniqueness for the indexed fields
    },
    phoneNumber: {
        type: String,
        required: true,
        minlenght: [11, 'Needs to be longer'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlenght: [8, 'need to be longer'],
    },
    shippingAddress: {
         streetName: {
            type: String,
            required: true,
            minlenght: [6, 'need to be longer'],
        },
        townCity : {
            type : String,
            required: true,
        },
        houseNumber : {
            type : Number,
            required: true,
        },
        postcode : {
            type : String,
            required: true,
        }
    },
    record: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    } 
})


userSchema.methods.verifyPassword = function(password){
    console.log('password from User' + password);
    console.log('password from DataBase' + this.password);
    return bcrypt.compareSync(password, this.password)
}



const User = mongoose.model('User', userSchema)

module.exports = {User}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First Name must be more that 3 characters'],
        maxlength: [15, 'First Name must be less that 15 characters']
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'Last Name must be more that 3 characters'],
        maxlength: [15, 'Last Name must be less that 15 characters']
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
        minlength: [11, 'Needs to be longer'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'need to be longer'],
    },
    shippingAddress: {
         streetName: {
            type: String,
            required: true,
            minlength: [6, 'need to be longer'],
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
    profilePicture: {
        type: String
    },
    record: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }]
},{timestamps: true})


userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = {User}



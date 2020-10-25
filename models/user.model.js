const mongoose = require(`mongoose`);
const crypto = require(`crypto`);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type:String, unique:true, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required: true},
    imgPath: String,
    hash:String,
    salt:String
});  

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString(`hex`);
    this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString(`hex`);
}
userSchema.methods.checkPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString(`hex`);
    return this.hash == hash;
}


userSchema.methods.passwordValidity = function(password){
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");  
    if(!regex.test(password)){
        return false;
    }else{
        return true;
    }    
}

userSchema.methods.fieldsValidity = function(password){
    if (!this.email || !this.firstName || !this.lastName || !password){
        return false;
    }else{
        return true;
    }
}



const User = mongoose.model('User', userSchema);
module.exports = User
const mongoose=require('mongoose');

var employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
     },
     designation: {
     type: String,
     required:true
     },
     email:{
     type:String,
     trim:true,
     required:true,
     unique:true
     },
     phoneNo:{
        type:String,
        trim:true,
        required:true,
    },
     address:{
         type: String,
         required:true
     },
     photo:{
        data: Buffer, //images of products are put in a buffer instead of the actual db 
        contentType: String
    },
     
 //TODO salting is hiding the password may be
 //done
    //  encry_password:{
    //  type:String,
    //  required: true 
    //  },
    //  salt: String,
    //  role:{
    //  type:Number,
    //  default:0
    //  },
     },
     {timestamps: true}
     );
 
//    userSchema.virtual("password")
//      .set(function(password){
//          this._password=password
//          this.salt=uuidv1();
//          this.encry_password=this.securePassword(password)
//      })
//      .get(function(){
//          return this._password
//      })
//      userSchema.methods={
//        authenticate:function(plainpassword){
//          return this.securePassword(plainpassword)===this.encry_password
//        },
//        securePassword:function(plainpassword){
//            if(!plainpassword) return "";
//            try{
//                return crypto
//                .createHmac('sha256', this.salt)
//                .update(plainpassword)
//                .digest('hex');
 
//            }
//            catch(error){
//                return "";
//            }        
//        }
//    }
 
   module.exports=mongoose.model("Employee",employeeSchema)

import bcrypt from "bcrypt";
import User from "../models/userModels.js";
import { generateToken } from "../utils/generateToken.js";


export const signup = async (req,res) =>{
  try {
    
 
  console.log(req.body)
  const {email, password, firstName, lastName} = req.body 
  console.log(email)
  const userExist = await User.findOne({email});

  if(userExist){
    return res.send('user is already exist ');
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password,saltRounds);

  const newUser = new User({
    email,
    firstName,
    lastName,
    hashPassword,
  })
  const newUserCreated = await newUser.save();

  if(!newUserCreated){
    return res.send('user is not created')

  }

  const token = generateToken(email);
  res.cookie("token", token)
    res.send("Signed successfully!");

} catch (error) {
  console.log(error, "Something wrong");
  res.status(500).send("Internal Server Error");
}

};

export const signin = async (req,res) =>{
    try {
    
        const {email,password} = req.body;
        const user = await User.findOne({email});
        // console.log(user)

        if(!user){
            return res.status(400).send('user not found')
        }

        const matchPassword = await bcrypt.compare(password,user.hashPassword);
        if(!matchPassword){
            return res.status(400).send('password is not correct');
        }
        const token = generateToken(email);
        res.cookie("token", token);
        res.send("Logged in!");
    } catch (error) {
      console.log(error, "Something wrong");
      res.status(500).send("Internal Server Error");
    }
    
}

export default  {
    signup,
    signin,
}

// ask{check one more in ppt}
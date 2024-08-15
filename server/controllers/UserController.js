import User from "../models/User.js";

export const getUser = async(req, res) => {
    try {
        const getUser = await User.find({username: req.body.username})
        if (getUser.length == 0) {
          return res.status(204).send({message: "User not found"})
        }
        if(getUser[0].password != req.body.password) {
            return res.status(401).send({message: "Wrong password"})
        }
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json("Error");
    }
}

export const createUser = async(req, res) => {
    try {
        const exist = await User.find({username: req.body.username});
      
        if (exist.length != 0) {
          return res.status(409).json({message: "Username already exists"});
        } 
    
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json(newUser);
        
    } catch(err) {
        res.status(500).send(err);
    }
}

export const updateUser = async(req, res) => {
    try {  
        // Find user
        const user = await User.find({username: req.query.username})
        if (user.length == 0) {
            return res.status(404).json({message: "User not found"});
        }

        // Check if email or username already exists in database
        const exist = await User.find({$or: [{username: req.body.username}, {email: req.body.email}]});
        if (exist.length != 0) {
            return res.status(409).json({message: "Username or email already exists"});
        }

        // Update user data if user exists and username/email doesn't exist
        const updateUser = await User.updateOne({username: req.query.username}, {$set: req.body})
        res.status(200).json(updateUser)

    } catch (err) {
        res.status(404).send("Server error");
    }

}

export const deleteUser = async(req, res) => {
    try {
        const deleted = await User.deleteOne({username: req.query.username})
    
        if (deleted.deletedCount == 0) {
          return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({message: "User successfully deleted"})  
    } catch(err) {
        res.status(200).send({message: "Server error"})
    }
}
const User = require('../model/User');

const bcrypt =require('bcrypt-nodejs');

const handleRegister = async(req, res) => {
    const userData = req.body;
    let user = await User.findOne({ email: userData.email });
    if(user){
       return res.status(400).send('User already exisits!');
    }else {
		userData.password=bcrypt.hashSync(userData.password);
		userData.joined = Date.now();
		userData.entries = 0;
        User.create(userData).then((user) => {

            console.log(`User - ${userData.name} registered successfully!!`);

            res.status(200).json(user);
        }).catch((err) => {
            res.status(500).json("Failed to create user");
            console.log(err);
        })
    }
};

module.exports ={
	handleRegister: handleRegister
}

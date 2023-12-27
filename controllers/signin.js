const User = require('../model/User');

const bcrypt =require('bcrypt-nodejs');

const handleSignin= async (req,res) => {
	const { email, password } = req.body;

	if(!email || !password){
		return res.status(400).json('incorrect form submission');
	}

	const user = await User.findOne({ email });

	if(!user) {
		console.log("User doesn't exist")
        res.status(404).send('Error login, User not found!!');
	}else {
		const isValid= bcrypt.compareSync(password, user.password);
		if(isValid) {
			console.log(`${user.name} Login Successfull`);
            res.send(user);
		}else {
			res.status(400).json('wrong credentials');
		}
	}
}

module.exports ={
	handleSignin: handleSignin
}

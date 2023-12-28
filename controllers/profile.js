const User = require('../model/User');

const bcrypt =require('bcrypt-nodejs');

const handleProfile= async (req, res) => {
	const {id} =req.params;
	
	User.findById(id).then((user) => {
		if(user) {
			res.send(user);
		}else {
			res.status(400).json('User Not Found');
		}
	}).catch((err) => {
		res.status(400).json('Not Found')
	})
}

const changePassword = async (req, res) => {
	const { id, password } = req.body;

	const newPassword = bcrypt.hashSync(password);

	User.findById(id).then((user) => {

		if(user) {
			User.updateOne({_id: id}, {password: newPassword}).then(() => {
                res.send('Password Updated successfully!');
            }).catch((err) => {
                console.log(err);
            })
		}else {
			res.status(400).json('Sorry, Something went worng. Unable to change password.');
		}
	}).catch((err) => {
		res.status(400).json('Sorry, Something went worng. Unable to change password')
	})
}

module.exports ={
	handleProfile: handleProfile,
	changePassword: changePassword
}

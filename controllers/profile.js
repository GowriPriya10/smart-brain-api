const User = require('../model/User');

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

module.exports ={
	handleProfile: handleProfile
}

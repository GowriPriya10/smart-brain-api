const User = require('../model/User');

const handleApiCall = async (req, res) => {

	const url = process.env.CLARIFAI_API_URL;
	const key = process.env.CLARIFAI_API_KEY;

	const options = {
		method: 'post',
		headers: {
			'Authorization': `Key ${key}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'inputs': [
				{
					'data': {
						'image': {
							'url': req.body.input
						}
					}
				}
			]
		})
	};

	await fetch(url, options)
            .then(response => response.json())
            .then(jsonData => {
				res.json(jsonData)
			})
			.catch(err=>res.status(400).json('unable to work with api'));
}

const handleImage=(req, res) => {
	const {id} =req.body;

	User.findById(id).then((user) => {

		if(user) {
			User.updateOne({_id: id}, {entries: ++user.entries}).then(() => {
                res.send({entries: user.entries});
            }).catch((err) => {
                console.log(err);
            })
		}else {
			res.status(400).json('unable to get entrie');
		}
	}).catch((err) => {
		res.status(400).json('unable to get entrie')
	})
}

module.exports={
	handleImage:handleImage,
	handleApiCall: handleApiCall
}

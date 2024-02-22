const jwt = require("jsonwebtoken");

// User defined string data that will be used JSON web tokens
// Used in the algorithm for encrypting our data which makes it difficult to decode the information without the defined secret keyword
const secret = "EcommerceAPI";

// JSON Web Tokens
// It is a way of securely passing information from the server the the frontend or to other parts of server.
// Information is kept secure through the use of the secret code

// Method for creating a json web token
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}
	// sign() it generates a Json web token
	// Syntax:
		// jwt.sign(payload, secretKey, {options});
	return jwt.sign(data, secret, {});
}

// token verification
module.exports.verify = (request, response, next) => {
	let token = request.headers.authorization;

	if(token === undefined){
		return response.send("No token provided!")
	}else{
		token = token.slice(7, token.length);

		// Token decryption
		jwt.verify(token, secret, (err, decodedToken) => {
			if(err){
				return response.send({
					auth: "Failed",
					message: err.message
				})
			}else{
				request.user = decodedToken;
				next();
			}
		})
	}
}

// To check whether the user is admin or not
module.exports.verifyAdmin = (request, response, next) => {
	// condition to check whether the user is admin or not
	if(request.user.isAdmin){
		next();
	}else{
		return response.send({
			auth: "Failed",
			message: "Action Forbidden!"
		})
	}
}
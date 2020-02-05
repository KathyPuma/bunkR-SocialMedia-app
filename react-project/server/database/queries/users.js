const db = require('../db')

const getAllUsers = async () => {
	const users = await db.any("SELECT id, email FROM users")
	return users;
}

const addNewUser = async (user) => {
	const newUserQuery = `
		INSERT INTO users(email, user_password)
			VALUES($/email/, $/password/)
			RETURNING id, email
	`
	const newUser = await db.one(newUserQuery, user)
	return newUser;
}

const getUserByEmail = async (email) => {
	const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email])
	return user;
}

module.exports = {
	getAllUsers,
	addNewUser,
	getUserByEmail
}

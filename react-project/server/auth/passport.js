const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('../auth/helpers');
const usersQueries = require('../database/queries/users');

passport.use(new LocalStrategy(async (email, password, done) => {
  console.log('Authenticating user', email, password)
  try {
    const user = await usersQueries.getUserByEmail(email);
    if (!user) {
      // Email not found in the database
      return done(null, false)
    }

    const passMatch = await comparePasswords(password, user.userPassword);
    if (!passMatch) {
      // Email found but passwords don't match
      return done(null, false)
    }

    delete user.userPassword; // Delete password_diggest from user object to not expose it accidentally
    done(null, user);

  } catch (err) {
    done(err)
  }
}))

passport.serializeUser((user, done) => {
  console.log('serializing user to session')
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  console.log('deserializing user from session')
  try {
    let retrievedUser = await usersQueries.getUserByEmail(user.email)
    delete retrievedUser.userPassword;
    done(null, retrievedUser)
  } catch (err) {
    done(err, false)
  }
})

module.exports = passport;
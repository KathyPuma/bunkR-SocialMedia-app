import React from 'react';

const SignupForm = ({
  email, password, handleChange, signupUser
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser()
  }


  return (
    <div>
      <h2> Sign-Up </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="***"
          onChange={handleChange}
        />
        <input type="submit" value="Signup" />
      </form>
    </div>
  )
}

export default SignupForm;

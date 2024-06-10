import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, loginUser, logoutUser, saveProfile } from '../redux/actions/profileActions';
import '../styles/Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(state => state.profile.profile);
  const users = useSelector(state => state.profile.users);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(profile);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    location: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    if (profile) {
      setLoggedInUser(profile);
      setFormData(profile);
    } else {
      setLoggedInUser(null);
      setFormData({
        fullName: '',
        age: '',
        location: '',
        email: '',
        password: '',
        repeatPassword: '',
      });
    }
  }, [profile]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      dispatch(loginUser(user));
      setShowLogin(false);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const newUser = {
      fullName: e.target.fullName.value,
      age: e.target.age.value,
      location: e.target.location.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(addUser(newUser));
    dispatch(loginUser(newUser));
    setShowSignIn(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(loggedInUser);
  };

  const handleSave = () => {
    dispatch(saveProfile(formData));
    setLoggedInUser(formData);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAgeKeyPress = (e) => {
    // Prevent the user from typing 'e', '-', and '+' symbols
    if (e.key === 'e' || e.key === '-' || e.key === '+' || e.key === '.') {
      e.preventDefault();
    }
  };

  return (
    <div className="profile-container">
      <button className="back-button" onClick={handleBack}>Back</button>
      {!loggedInUser ? (
        <div className="auth-buttons">
          <button onClick={() => setShowLogin(true)}>Log In</button>
          <button onClick={() => setShowSignIn(true)}>Sign In</button>
        </div>
      ) : (
        <>
          <div className="welcome-message">
            <h2>Welcome, {loggedInUser && loggedInUser.fullName}!</h2> {/* Check if loggedInUser exists */}
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          </div>
          <div className="user-data"> {/* Render user data only if logged in */}
            {!editMode ? (
              <div>
                <p>Full Name: {loggedInUser && loggedInUser.fullName}</p> {/* Check if loggedInUser exists */}
                <p>Age: {loggedInUser && loggedInUser.age}</p> {/* Check if loggedInUser exists */}
                <p>Location: {loggedInUser && loggedInUser.location}</p> {/* Check if loggedInUser exists */}
                <p>Email: {loggedInUser && loggedInUser.email}</p> {/* Check if loggedInUser exists */}
                <p>Password: {loggedInUser && '*'.repeat(loggedInUser.password.length)}</p> {/* Check if loggedInUser exists */}
              </div>
            ) : (
              <div>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                <input type="number" name="age" value={formData.age} onChange={handleChange} onKeyPress={handleAgeKeyPress} />
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <label htmlFor="password" style={{ marginBottom: '10px' }}>Change password</label>
                <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} />
                <input id="password" type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
              </div>
            )}
            {!editMode ? (
              <button onClick={handleEdit}>Edit</button>
            ) : (
              <div>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            )}
          </div>
        </>
      )}
      {showLogin && (
        <div className="popup">
          <form onSubmit={handleLogin}>
            <h2>Log In</h2>
            <label>Email:</label>
            <input type="email" name="email" required />
            <label>Password:</label>
            <input type="password" name="password" required />
            <button type="submit">Log In</button>
            <button type="button" onClick={() => setShowLogin(false)}>Cancel</button>
          </form>
        </div>
      )}
      {showSignIn && (
        <div className="popup">
          <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <label>Full Name:</label>
            <input type="text" name="fullName" required />
            <label>Age:</label>
            <input type="number" name="age" required onKeyPress={handleAgeKeyPress} />
            <label>Location:</label>
            <input type="text" name="location" required />
            <label>Email:</label>
            <input type="email" name="email" required />
            <label>Password:</label>
            <input type="password" name="password" required />
            <label>Repeat Password:</label>
            <input type="password" name="repeatPassword" required />
            <button type="submit">Sign In</button>
            <button type="button" onClick={() => setShowSignIn(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;

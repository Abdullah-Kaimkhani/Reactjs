import { useState } from 'react';
import { FaGithub, FaSearch, FaUserFriends, FaCode, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './GitHubFinder.css';

const GitHubFinder = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-finder">
      <header className="finder-header">
        <div className="header-content">
          <h1>
            <FaGithub className="github-icon" />
            GitHub Finder
          </h1>
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Search GitHub username..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="search-button"
              type="submit"
            >
              Search
            </motion.button>
          </form>
        </div>
      </header>

      <main className="finder-main">
        {loading && (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="spinner"
          >
            <FaGithub />
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-message"
          >
            😢 {error}
          </motion.div>
        )}

        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="user-card"
          >
            <div className="git-header">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="user-avatar"
              />
              <div className="user-info">
                <h2>{userData.name || userData.login}</h2>
                <p className="username">@{userData.login}</p>
                {userData.bio && <p className="bio">{userData.bio}</p>}
              </div>
            </div>

            <div className="user-stats">
              <div className="stat">
                <FaUserFriends className="stat-icon" />
                <div>
                  <h3>{userData.followers}</h3>
                  <p>Followers</p>
                </div>
              </div>
              <div className="stat">
                <FaUserFriends className="stat-icon" />
                <div>
                  <h3>{userData.following}</h3>
                  <p>Following</p>
                </div>
              </div>
              <div className="stat">
                <FaCode className="stat-icon" />
                <div>
                  <h3>{userData.public_repos}</h3>
                  <p>Repos</p>
                </div>
              </div>
            </div>

            <div className="user-details">
              {userData.location && (
                <div className="detail">
                  <FaMapMarkerAlt />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData.blog && (
                <div className="detail">
                  <FaLink />
                  <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                    {userData.blog}
                  </a>
                </div>
              )}
            </div>

            <motion.a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="profile-button"
            >
              View GitHub Profile
            </motion.a>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GitHubFinder;
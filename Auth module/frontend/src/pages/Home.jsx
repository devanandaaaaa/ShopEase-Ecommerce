import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Welcome to E-Shop</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.2rem' }}>
        A complete e-commerce authentication module.
      </p>
      
      <div style={{ marginTop: '3rem' }}>
        {user ? (
          <Link to="/profile" className="btn" style={{ display: 'inline-block', width: 'auto', padding: '0.75rem 2rem' }}>
            Go to Profile
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
              Sign In
            </Link>
            <Link to="/register" className="btn btn-secondary" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

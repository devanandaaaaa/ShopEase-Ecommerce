import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };
return (
  <nav className="navbar">
    <div className="nav-links">
      <Link to="http://localhost:5500" className="nav-item">
        Home
      </Link>

      <Link
        to="http://localhost:5500/#productContainer"
        className="nav-item"
      >
        Products
      </Link>

      <Link to="/login" className="nav-item">
        Login
      </Link>

      <Link to="/register" className="nav-item">
        Register
      </Link>

      <Link to="/profile" className="nav-item">
        Profile
      </Link>

      <Link to="/orders" className="nav-item">
        Orders
      </Link>

      <Link to="/cart" className="nav-item">
        Cart 🛒
      </Link>

      {user && (
        <>
          <span className="nav-item">Hi, {user.name}</span>

          {user.role === 'admin' && (
            <Link to="/admin" className="nav-item">
              Admin Panel
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ padding: '0.25rem 0.75rem', width: 'auto' }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  </nav>
);
};

export default Navbar;

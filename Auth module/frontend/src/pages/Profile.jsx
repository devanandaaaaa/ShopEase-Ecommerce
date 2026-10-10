import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile-card">
      <h2 style={{ marginBottom: '2rem' }}>My Profile</h2>
      
      <div className="profile-item">
        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Full Name</span>
        <strong style={{ fontSize: '1.125rem' }}>{user.name}</strong>
      </div>
      
      <div className="profile-item">
        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Email Address</span>
        <strong style={{ fontSize: '1.125rem' }}>{user.email}</strong>
      </div>
      
      <div className="profile-item" style={{ borderBottom: 'none' }}>
        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Account Role</span>
        <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default Profile;

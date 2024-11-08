// Admins.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admins = () => {
  const navigate = useNavigate();

  // Navigation handler for the registration details page
  const goToRegistrationDetails = () => {
    try {
      navigate('/regdetails');
    } catch (error) {
      console.error('Navigation error to registration details:', error);
    }
  };

  // Navigation handler for the student attendance timestamp page
  const goToStudentTimestamps = () => {
    try {
      navigate('/timestamp');
    } catch (error) {
      console.error('Navigation error to timestamp page:', error);
    }
  };

  // Define reusable styles
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    main: {
      padding: '20px',
    },
    button: {
      marginRight: '10px',
    },
  };

  return (
    <div>
      <header style={styles.header}>
        <h2>Admin Panel</h2>
        <div>
          {/* Navigate to Registration Details */}
          <button onClick={goToRegistrationDetails} style={styles.button}>
            Registration Details
          </button>

          {/* Navigate to Timestamp Page */}
          <button onClick={goToStudentTimestamps}>
            Timestamp Student
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <p>Welcome to the admin panel. Use the buttons above to manage registrations and attendance.</p>
      </main>
    </div>
  );
};

export default Admins;

import React, { useState, useEffect } from 'react';
import './index.css';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    // User's provided Google Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxm7ttKr639Apxn_csdkAOObThXyLteBalaIxQxjzcIvpis4D5W0D9zD-jhuNL7bWXXTQ/exec';
    
    setIsSubmitting(true);
    setResponseMsg('');
    setIsError(false);

    const formData = new FormData(form);

    fetch(scriptURL, { 
      method: 'POST', 
      body: formData
    })
    .then(async response => {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (err) {
        if (text.includes("sign in") || text.includes("requesting_access") || text.includes("<html")) {
          throw new Error("Google Apps Script requires authentication. Please re-deploy your Web App with 'Who has access: Anyone'.");
        }
        throw new Error("Received invalid response from server.");
      }
    })
    .then(data => {
      setIsSubmitting(false);
      
      if (data && data.status === 'success') {
        setResponseMsg('Success! Columns checked/created and details stored.');
        setIsError(false);
        form.reset();
      } else {
        throw new Error((data && data.error) ? data.error : 'Unknown error');
      }
    })
    .catch(error => {
      console.error('Submission Error:', error.message);
      setIsSubmitting(false);
      
      // Provide a more specific error message to the user if it's the deployment issue
      if (error.message.includes("authentication") || error.message.includes("re-deploy")) {
        setResponseMsg("Error: The Google Script is private. Please deploy it with 'Who has access: Anyone'.");
      } else if (error.message === "Failed to fetch" || error.message.includes("NetworkError") || error.name === "TypeError") {
        setResponseMsg("Error: Blocked by CORS. Your Google Script must be deployed with 'Who has access: Anyone'.");
      } else {
        setResponseMsg(`Something went wrong: ${error.message}`);
      }
      setIsError(true);
    });
  };

  return (
    <div className="contact-page">
      <div className="container contact-page-container" style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'var(--color-surface)', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--color-primary)', fontSize: '2rem' }}>Consultancy Form</h2>
          <form id="consultationForm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Name:</label>
              <input type="text" name="Name" required className="form-input" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Email:</label>
              <input type="email" name="Email" required className="form-input" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Contact Number:</label>
              <input type="tel" name="Contact Number" required className="form-input" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Message:</label>
              <textarea name="Message" required className="form-input" rows={5} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none', resize: 'vertical' }}></textarea>
            </div>
            
            <button type="submit" id="submitBtn" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: '1rem', padding: '1rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>

          {responseMsg && (
            <div id="formResponse" style={{ marginTop: '20px', fontWeight: 'bold', color: isError ? '#ff4d4d' : '#4caf50', textAlign: 'center', padding: '1rem', borderRadius: '8px', backgroundColor: isError ? 'rgba(255, 77, 77, 0.1)' : 'rgba(76, 175, 80, 0.1)' }}>
              {responseMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

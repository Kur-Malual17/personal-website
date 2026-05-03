export default function DebugPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'NOT SET';
  
  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Environment Debug</h1>
      <p><strong>NEXT_PUBLIC_API_URL:</strong> {apiUrl}</p>
      <p><strong>Expected:</strong> https://personal-website-production-643f.up.railway.app</p>
      
      {apiUrl === 'NOT SET' && (
        <div style={{ 
          backgroundColor: '#fee', 
          padding: '20px', 
          marginTop: '20px',
          border: '2px solid red'
        }}>
          <h2>❌ Environment Variable NOT SET</h2>
          <p>The NEXT_PUBLIC_API_URL is not configured in Vercel.</p>
        </div>
      )}
      
      {apiUrl !== 'NOT SET' && apiUrl !== 'https://personal-website-production-643f.up.railway.app' && (
        <div style={{ 
          backgroundColor: '#ffa', 
          padding: '20px', 
          marginTop: '20px',
          border: '2px solid orange'
        }}>
          <h2>⚠️ Wrong URL</h2>
          <p>The URL doesn't match the expected Railway backend.</p>
        </div>
      )}
      
      {apiUrl === 'https://personal-website-production-643f.up.railway.app' && (
        <div style={{ 
          backgroundColor: '#efe', 
          padding: '20px', 
          marginTop: '20px',
          border: '2px solid green'
        }}>
          <h2>✅ Correct!</h2>
          <p>Environment variable is set correctly.</p>
        </div>
      )}
    </div>
  );
}

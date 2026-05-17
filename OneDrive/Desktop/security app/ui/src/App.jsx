import { useState } from 'react';

const pythonBase = 'http://localhost:8000';
const dotnetBase = 'http://localhost:5000';

function App() {
  const [pythonResult, setPythonResult] = useState('');
  const [dotnetResult, setDotnetResult] = useState('');

  const formatResponse = (data) => JSON.stringify(data, null, 2);

  const fetchJson = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status} ${response.statusText}: ${text}`);
    }
    return response.json();
  };

  const callPython = async (endpoint, setter) => {
    try {
      const data = await fetchJson(`${pythonBase}${endpoint}`);
      setter(formatResponse(data));
    } catch (error) {
      setter(error.message);
    }
  };

  const callDotnet = async (endpoint, setter) => {
    try {
      const data = await fetchJson(`${dotnetBase}${endpoint}`);
      setter(formatResponse(data));
    } catch (error) {
      setter(error.message);
    }
  };

  return (
    <div className="page">
      <header>
        <h1>SG Securities React UI</h1>
        <p>Call the local Python and .NET microservices from one interface.</p>
      </header>

      <section className="card">
        <h2>Python service</h2>
        <div className="button-row">
          <button onClick={() => callPython('/health', setPythonResult)}>Health</button>
          <button onClick={() => callPython('/security-groups', setPythonResult)}>
            List security groups
          </button>
        </div>
        <pre>{pythonResult}</pre>
      </section>

      <section className="card">
        <h2>.NET service</h2>
        <div className="button-row">
          <button onClick={() => callDotnet('/health', setDotnetResult)}>Health</button>
          <button onClick={() => callDotnet('/security-groups', setDotnetResult)}>
            List security groups
          </button>
        </div>
        <pre>{dotnetResult}</pre>
      </section>
    </div>
  );
}

export default App;

const pythonBase = "http://localhost:8000";
const dotnetBase = "http://localhost:5000";

const pythonResult = document.getElementById("python-result");
const dotnetResult = document.getElementById("dotnet-result");

function formatResponse(response) {
  return response
    ? JSON.stringify(response, null, 2)
    : "No response";
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }
  return response.json();
}

async function handlePythonHealth() {
  try {
    const data = await fetchJson(`${pythonBase}/health`);
    pythonResult.textContent = formatResponse(data);
  } catch (error) {
    pythonResult.textContent = error;
  }
}

async function handlePythonList() {
  try {
    const data = await fetchJson(`${pythonBase}/security-groups`);
    pythonResult.textContent = formatResponse(data);
  } catch (error) {
    pythonResult.textContent = error;
  }
}

async function handleDotnetHealth() {
  try {
    const data = await fetchJson(`${dotnetBase}/health`);
    dotnetResult.textContent = formatResponse(data);
  } catch (error) {
    dotnetResult.textContent = error;
  }
}

async function handleDotnetList() {
  try {
    const data = await fetchJson(`${dotnetBase}/security-groups`);
    dotnetResult.textContent = formatResponse(data);
  } catch (error) {
    dotnetResult.textContent = error;
  }
}

document.getElementById("python-health").addEventListener("click", handlePythonHealth);
document.getElementById("python-list").addEventListener("click", handlePythonList);
document.getElementById("dotnet-health").addEventListener("click", handleDotnetHealth);
document.getElementById("dotnet-list").addEventListener("click", handleDotnetList);

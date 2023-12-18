// Create an instance of the GitHub SDK
const githubSDK = new GitHubSDK("https://api.github.com");
// Function to authenticate with GitHub API token
function authenticateWithToken() {
  const apiTokenInput = document.getElementById("apiTokenInput").value;

  try {
    // Authenticate with the GitHub API token
    githubSDK.authenticate(apiTokenInput);
    console.log("Authenticated with GitHub API token.");
  } catch (error) {
    console.error("Authentication Error:", error.message);
  }
}

// Function to fetch GitHub user data from the server
async function fetchGitHubUserData() {
  const userIdInput = document.getElementById("userIdInput").value;

  try {
    // Fetch user data using the SDK
    const userData = await githubSDK.getUserData(userIdInput);
    displayUserData(userData);
  } catch (error) {
    console.error("Error:", error.message);
    displayError(error.message);
  }
}

// Function to display GitHub user data on the page
function displayUserData(userData) {
  const userDataContainer = document.getElementById("userDataContainer");
  userDataContainer.innerHTML = `<pre>${JSON.stringify(
    userData,
    null,
    2
  )}</pre>`;
}

// Function to display error messages on the page
function displayError(message) {
  const userDataContainer = document.getElementById("userDataContainer");
  userDataContainer.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

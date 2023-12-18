class GitHubSDK {
  /**
   * Initializes the GitHub SDK.
   * @param {string} apiBaseUrl - The base URL of the server-side API.
   */
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
    this.token = null;
  }

  /**
   * Authenticates the user with the GitHub API using a token.
   * @param {string} token - The GitHub API token.
   * @throws Will throw an error if authentication fails.
   */
  authenticate(token) {
    // Simulate a token validation process
    if (token === "invalid-token") {
      throw new Error("Invalid GitHub API token");
    }

    this.token = token;
  }

  /**
   * Fetches GitHub user data based on the user ID.
   * @param {string} userId - The GitHub user ID.
   * @returns {Promise} A promise that resolves with the user data.
   * @throws Will throw an error if the request fails or user data is not found.
   */
  async getUserData(userId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }
  }
}

module.exports = GitHubSDK;

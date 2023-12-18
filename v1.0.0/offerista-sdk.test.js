const GitHubSDK = require('./offerista-sdk-unstable');

describe('GitHub SDK', () => {
  let githubSDK;

  beforeEach(() => {
    // Initialize a new instance of GitHubSDK before each test
    githubSDK = new GitHubSDK('https://api.github.com');
  });

  describe('Authentication', () => {
    it('should authenticate with a valid token', () => {
      const token = 'valid-github-api-token';
      githubSDK.authenticate(token);
      expect(githubSDK.token).toBe(token);
    });

    it('should throw an error for an invalid token', () => {
        const token = 'invalid-github-api-token';
        try {
          githubSDK.authenticate(token);
        } catch (error) {
          console.error(error.message);
          expect(error.message).toBe('Invalid GitHub API token');
        }
     });
     
  });

  describe('Fetch User Data', () => {
    it('should fetch user data successfully', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ login: 'testuser', id: 123 }),
        })
      );

      githubSDK.authenticate('valid-github-api-token');
      const userData = await githubSDK.getUserData('testuser');
      expect(userData.login).toBe('testuser');
      expect(userData.id).toBe(123);
    });

    it('should throw an error for a failed API request', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Not Found',
        })
      );

      githubSDK.authenticate('valid-github-api-token');
      await expect(githubSDK.getUserData('nonexistentuser')).rejects.toThrow(
        'Failed to fetch user data: Not Found'
      );
    });
  });
});

const GITHUB_API_BASE = 'https://api.github.com';


console.log('Loaded GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN);

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
};

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;

    const response = await fetch(`${GITHUB_API_BASE}/users?since=${start}`, {
      headers,
    });

    const data = await response.json();

    console.log('Random user search response:', response.status, data);

    if (!response.ok) {
      console.error('GitHub API error:', data);
      throw new Error(data.message || 'Failed to fetch random users');
    }

    return data;
  } catch (err) {
    console.error('searchGithub error:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    console.log('Searching GitHub user:', username);

    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers,
    });

    const data = await response.json();

    console.log('Response status:', response.status);
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('GitHub API user fetch failed:', data.message || data);
      return null;
    }

    return data;
  } catch (err) {
    console.error('searchGithubUser error:', err);
    return null;
  }
};

export { searchGithub, searchGithubUser };

const main = document.getElementsByTagName("main")

const links = [
	"https://github.com/Fasamii/sobsob.nvim",
	"https://github.com/Fasamii/ccoll",
]

function parseGitHubUrl(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub URL');
  }
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, '') // Remove .git suffix if present
  };
}

async function fetchRepoInfo(repoUrl) {
  try {
    const { owner, repo } = parseGitHubUrl(repoUrl);
    
    // GitHub API endpoints
    const repoApiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const languagesApiUrl = `https://api.github.com/repos/${owner}/${repo}/languages`;
    const readmeApiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    
    // Fetch all data concurrently
    const [repoResponse, languagesResponse, readmeResponse] = await Promise.all([
      fetch(repoApiUrl),
      fetch(languagesApiUrl),
      fetch(readmeApiUrl)
    ]);
    
    // Check if all requests were successful
    if (!repoResponse.ok) {
      throw new Error(`Failed to fetch repo info: ${repoResponse.status}`);
    }
    if (!languagesResponse.ok) {
      throw new Error(`Failed to fetch languages: ${languagesResponse.status}`);
    }
    if (!readmeResponse.ok) {
      throw new Error(`Failed to fetch README: ${readmeResponse.status}`);
    }
    
    // Parse responses
    const repoData = await repoResponse.json();
    const languagesData = await languagesResponse.json();
    const readmeData = await readmeResponse.json();
    
    // Decode README content (it's base64 encoded)
    const readmeContent = atob(readmeData.content);
    
    return {
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description,
      languages: Object.keys(languagesData),
      languageStats: languagesData,
      readme: readmeContent,
      url: repoData.html_url,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count
    };
    
  } catch (error) {
    console.error('Error fetching repository info:', error);
    throw error;
  }
}

links.forEach((link) => {
	console.log(fetchRepoInfo(link));
});

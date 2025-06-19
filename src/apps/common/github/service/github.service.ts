import { Injectable, BadRequestException } from '@nestjs/common';

import axios from 'axios';

import { IGithubParsedData, IGithubRepo } from '../types';

@Injectable()
export class GithubService {
  private readonly githubApiBase = 'https://api.github.com';

  async fetchRepoInfo(repoUrl: string): Promise<IGithubParsedData> {
    if (!repoUrl.startsWith('https://github.com/')) {
      throw new BadRequestException('URL must start with https://github.com/');
    }

    const parts = repoUrl.replace('https://github.com/', '').split('/');
    if (parts.length < 2) {
      throw new BadRequestException('Invalid GitHub repository URL');
    }

    const [owner, repo] = parts;

    const url = `${this.githubApiBase}/repos/${owner}/${repo}`;

    try {
      const response = await axios.get<IGithubRepo>(url, {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      });

      const data = response.data;

      return {
        name: data.name,
        repOwner: data.owner.login,
        stars: data.stargazers_count,
        forks: data.forks_count,
        openIssues: data.open_issues_count,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new BadRequestException('Repository not found');
      }

      throw new BadRequestException('Failed to fetch repository info');
    }
  }
}

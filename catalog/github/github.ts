import { TestConnection, TesterClassInterface } from "../../types/classDefinition";
import { Octokit } from "@octokit/rest";

export default class GitHub implements TesterClassInterface {
  readonly octokit;
  GITHUB_ACCOUNT_USERNAME: string;

  constructor({
    GITHUB_ACCESS_TOKEN,
    GITHUB_ACCOUNT_USERNAME,
  }: {
    GITHUB_ACCESS_TOKEN: string;
    GITHUB_ACCOUNT_USERNAME: string;
  }) {
    this.octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN });

    this.GITHUB_ACCOUNT_USERNAME = GITHUB_ACCOUNT_USERNAME;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      const response = await this.octokit.rest.users.getAuthenticated();

      if (response.data.login !== this.GITHUB_ACCOUNT_USERNAME) {
        throw new Error(
          `${this.GITHUB_ACCOUNT_USERNAME} is not the username associated with the access token`,
        );
      }

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to GitHub: ${err.message}`);
    }
  }
}

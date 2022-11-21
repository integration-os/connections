import axios from "axios";
import querystring from "querystring";
import { TestConnection, TesterClassInterface } from "../../../types/sourceClassDefinition";

export default class Spotify implements TesterClassInterface {
  SPOTIFY_BASE_URI: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;

  constructor({
    SPOTIFY_BASE_URI,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
  }: {
    SPOTIFY_BASE_URI: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
  }) {
    this.SPOTIFY_BASE_URI = SPOTIFY_BASE_URI;
    this.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID;
    this.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;
  }

  async testConnection(): Promise<TestConnection> {
    try {
      const response = await axios({
        url: "https://accounts.spotify.com/api/token",
        method: "post",
        data: querystring.stringify({ grant_type: "client_credentials" }),
        auth: { username: this.SPOTIFY_CLIENT_ID, password: this.SPOTIFY_CLIENT_SECRET },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      await axios({
        url: `${this.SPOTIFY_BASE_URI}/browse/new-releases?limit=1`,
        method: "get",
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
          "Content-Type": "application/json",
        },
      });

      return {
        success: true,
        message: "Connection tested successfully!",
      };
    } catch (err) {
      throw new Error(`Could not connect to Spotify: ${err.message}`);
    }
  }
}

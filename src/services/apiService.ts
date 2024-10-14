import axios from "axios";

var API_URL = "https://tracktik-challenge.staffr.com/";

export class ApiService {
  static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get(`${API_URL}${endpoint}`);
      return response;
    } catch (error) {
      throw new Error(`Error get ${endpoint}: ${error}`);
    }
  }
}

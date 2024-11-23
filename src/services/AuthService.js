import axios from 'axios';

// const AUTH_API_URL = 'http://localhost:3000/api/auth/';

const AUTH_API_URL = 'https://bikeswebapp.azurewebsites.net/api/auth/';

class AuthService {
  static async register(user) {
    try {
      const response = await axios.post(AUTH_API_URL + 'register', {
        username: user.username,
        email: user.email,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    
      return response.data;

    } catch (error) {
      console.error('Register error: ', error);
      throw error;
    }
  }

  static async login(user) {
    try {
      const response = await axios.post(AUTH_API_URL + 'login', {
        username: user.username,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.data.token) {

        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      return response.data;

    } catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('user');
  }

  // helpers
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      const headers = {
        Authorization: 'Bearer ' + user.token,
        'Content-Type': "application/x-www-form-urlencoded"

      }
      return headers;
    } else {
      return {

      };
    }
  }
}

export default AuthService;
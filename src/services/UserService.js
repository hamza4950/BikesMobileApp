import axios from 'axios';
import AuthService from '../services/AuthService';

//When moving to to Azure and connecting the sites to each other we have to change the url
// const USER_API_URL = 'http://localhost:3000/';
const USER_API_URL = 'https://bikeswebapp.azurewebsites.net/'

class UserService {

  // Bikes

  async fetchBikesForUser() {
    return await axios.get(USER_API_URL + 'api/bikes', { headers: AuthService.authHeader() });
  }

  async addBikeForUser(bike) {
    return await axios.post(USER_API_URL + 'api/bikes', bike, { headers: AuthService.authHeader() });
  }

  async changeBikeForUser(bikeId, bike) {
    return await axios.put(USER_API_URL + `api/bikes/${bikeId}`, bike, { headers: AuthService.authHeader() });
  }

  async deleteBikeForUser(bikeId) {
    return await axios.delete(USER_API_URL + `api/bikes/${bikeId}`, { headers: AuthService.authHeader() });
  }

  // Components

  async fetchComponentsForBike(bikeId) {
    return await axios.get(USER_API_URL + 'api/components/' + bikeId + '/list', { headers: AuthService.authHeader() });
  }

  async getComponentById(componentId) {
    return await axios.get(USER_API_URL + `api/components/${componentId}`, { headers: AuthService.authHeader() });
  }


  async addComponentForBike(bikeId, component) {
    return await axios.post(USER_API_URL + `api/components/${bikeId}`, component, { headers: AuthService.authHeader() });
  }

  async changeComponentForBike(componentId, component) {
    return await axios.put(USER_API_URL + `api/components/${componentId}`, component, { headers: AuthService.authHeader() });
  }

  async deleteComponentForBike(componentId) {
    return await axios.delete(USER_API_URL + `api/components/${componentId}`, { headers: AuthService.authHeader() });
  }

}

export default new UserService();

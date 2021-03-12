import axios from 'axios';

const launchURL = 'https://api.spacexdata.com/v3/launches/upcoming';

export const getLaunches = () => {
    return axios.get(launchURL);
}
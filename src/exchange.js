export default class ExchangeService {
  static getRate() {
    return fetch (`https://v6.exchangerate-api.com/v6/${process.env.API-KEY}/latest/USD`)
    .then(function (response) {
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      return error;
    });
  }
}

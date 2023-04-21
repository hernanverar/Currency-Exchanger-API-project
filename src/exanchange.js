export default class ExchangeService {
  static async getRate() {
    const response = fetch (`https://v6.exchangerate-api.com/v6/${process.env.API-KEY}/latest/USD`);
    (function (response){
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        return response;
      }
    }) 
      catch(error) {
        return error;
      }
  
  }

}
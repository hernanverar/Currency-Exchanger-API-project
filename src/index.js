import './css/styles.css';
import  ExchangeService from './exchange.js';
  
  //Business Logic

function getExchange(exchangeCurrency, dollarAmmount) {
  ExchangeService.ExchangeService(exchangeCurrency, dollarAmmount)
  .then(function(exchangeResponse) {
    if (exchangeResponse instanceof Errror) {
      const errorMessage = `there was a problem accessing the exchange data for ${exchangeResponse.message};`
      throw new Error(errorMessage);
    }
  })

  }


//UI logic


function errorMessage(error) {
  document.querySelector('#displayExchange').setAttribute("class", "error");
  document.querySelector('#displayExchange').innerText = `There was an error accessing the exchange data: ${error[0].status}: ${error[0].response}`;
}

function handleFormSubmission(e) {
  e.preventDefault();
  document.querySelector('#displayExchange').innerText = null;
  document.querySelector('#displayExchange').removeAttribute("class");
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});






import "./css/styles.css";
import ExchangeService from "./exchange.js";

//Business Logic

const convertCurrency = (exchangeCurrencyRate, dollarAmmount) => {
  return (exchangeCurrencyRate*dollarAmmount).toFixed(0);
};

async function getExchange(exchangeCurrency, dollarAmmount) {
  const rates = await ExchangeService.getRate();
  if(!rates.conversion_rates[exchangeCurrency]){
  }
  // console.log(rates.conversion_rates[exchangeCurrency]);
  return convertCurrency(rates.conversion_rates[exchangeCurrency], dollarAmmount);
}

//UI logic

async function handleFormSubmission(e) {
  e.preventDefault();

  const amountToConvert = document.getElementById("usDollar").value;
  const currencyCode = document.getElementById("exchangeToCurrency").value;
  const convertedCurrencyAmount = await getExchange(currencyCode,amountToConvert);

  // console.log("converted currency amount", convertedCurrencyAmount);

  document.querySelector("#displayExchange").innerText = `${amountToConvert} USD is equal to ${convertedCurrencyAmount} ${currencyCode}`;
  document.querySelector("#displayExchange").removeAttribute("class");
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});

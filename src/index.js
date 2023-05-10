import "./css/styles.css";
import ExchangeService from "./exchange.js";

// //Business Logic

const convertCurrency = (exchangeCurrencyRate, dollarAmmount) => {
  return (exchangeCurrencyRate * dollarAmmount).toFixed(0);
};

function errorMessage(error) {
  document.querySelector("#error-message").setAttribute("class", "error");
  document.querySelector(
    "#error-message"
  ).innerText = `There was an error accessing the exchange data: ${error.message}`;
}

async function getExchange(exchangeCurrency, dollarAmmount) {
  const rates = await ExchangeService.getRate();
  if (!rates.conversion_rates[exchangeCurrency]) {
    throw new Error("Exchange rate not found");
  }
  return convertCurrency(
    rates.conversion_rates[exchangeCurrency],
    dollarAmmount
  );
}

// UI logic

async function handleFormSubmission(e) {
  e.preventDefault();

  const amountToConvert = document.getElementById("usDollar").value;
  const currencyCode = document.getElementById("exchangeToCurrency").value;

  // Reset elements
  document.querySelector("#displayExchange").innerText = "";
  document.querySelector("#error-message").innerText = "";
  document.querySelector("#displayExchange").setAttribute("class", "hidden");
  document.querySelector("#error-message").setAttribute("class", "hidden");

  try {
    const convertedCurrencyAmount = await getExchange(
      currencyCode,
      amountToConvert
    );
    document.querySelector(
      "#displayExchange"
    ).innerText = `${amountToConvert} USD is equal to ${convertedCurrencyAmount} ${currencyCode}`;
    document.querySelector("#displayExchange").removeAttribute("class");
  } catch (error) {
    errorMessage(error);
  }

  // Reset input fields
  document.getElementById("usDollar").value = "";
  document.getElementById("exchangeToCurrency").value = "";
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});

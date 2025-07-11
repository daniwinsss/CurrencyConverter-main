import React, { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyinfo from "./hooks/useCurrencyinfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyData = useCurrencyinfo(fromCurrency);
  const currencyOptions = Object.keys(currencyData || {});

  const handleConvert = () => {
    if (!currencyData || !currencyData[toCurrency]) {
      alert("Currency conversion rate not available.");
      return;
    }
    const rate = currencyData[toCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg max-w-md w-full shadow-xl">
        <h1 className="text-center text-xl font-bold text-white mb-4">
          Currency Converter
        </h1>

        <InputBox
        label="From"
        amount={amount}
        onAmountChange={(value) => setAmount(value)}
        currencyOptions={currencyOptions} // 🟢 pass full list
        selectCurrency={fromCurrency}
        onCurrencyChange={(currency) => setFromCurrency(currency)} // 🟢 allow change
        />

        <div className="relative w-full my-4">
          <button
            className="absolute left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded shadow"
            onClick={handleSwap}
          >
            Swap
          </button>
        </div>

        <InputBox
          label="To"
          amount={convertedAmount}
          amountDisable={true}
          onCurrencyChange={(currency) => setToCurrency(currency)}
          currencyOptions={currencyOptions}
          selectCurrency={toCurrency}
        />

        <button
          onClick={handleConvert}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export default App;

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [currency, setCurrency] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [outPut, setOutPut] = useState("");
  //const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          //setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${currency}&from=${fromCurrency}&to=${toCurrency}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching data");

          const data = await res.json();

          setOutPut(data.rates[toCurrency]);
        } catch (err) {
          console.error(err.message);
        } /* finally {
          setIsLoading(false);
        } */
      }
      if (fromCurrency === toCurrency) return setOutPut(currency);
      fetchData();

      return function () {
        controller.abort();
      };
    },
    [currency, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={currency}
        onChange={(e) => setCurrency(Number(e.target.value))}
        /* disabled={isLoading} */
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        /* disabled={isLoading} */
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        /* disabled={isLoading} */
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{outPut}</p>
    </div>
  );
}

import { useState } from "react";

function NumberButton({ value, onButtonClick }) {
  return (
    <button className="number-button" onClick={onButtonClick}>
      {value}
    </button>
  );
}

function OperatorButton({ value, onButtonClick }) {
  return (
    <button className="operator-button" onClick={onButtonClick}>
      {value}
    </button>
  );
}

function EqualsButton({ value, onButtonClick }) {
  return (
    <button className="equals-button" onClick={onButtonClick}>
      {value}
    </button>
  );
}

export default function Calculator() {
  const [calculation, setCalculation] = useState("");
  const [lastClicked, setLastClicked] = useState("0");
  const [operatorClicked, setOperatorClicked] = useState(false);
  //0 - init, 1 - number, 2 - operator, 3 - cleared, 4 - calculated

  function handleNumberClick(number) {
    if (lastClicked !== "4") {
      setCalculation(calculation + number);
      setLastClicked("1");
    }
  }

  function handleOperatorClick(symbol) {
    if (lastClicked === "1" && !operatorClicked) {
      setLastClicked("2");
      setOperatorClicked(true);
      setCalculation(calculation + symbol);
    }
  }

  function clear() {
    setCalculation("");
    setLastClicked("3");
    setOperatorClicked(false);
  }

  function calculate() {
    if (lastClicked === "1") {
      setCalculation(eval(calculation));
      setLastClicked("4");
    }
  }

  return (
    <>
      <div className="calculation">{calculation}</div>
      <div>
        <NumberButton value="7" onButtonClick={() => handleNumberClick("7")} />
        <NumberButton value="8" onButtonClick={() => handleNumberClick("8")} />
        <NumberButton value="9" onButtonClick={() => handleNumberClick("9")} />
        <OperatorButton
          value="/"
          onButtonClick={() => handleOperatorClick("/")}
        />
      </div>
      <div>
        <NumberButton value="4" onButtonClick={() => handleNumberClick("4")} />
        <NumberButton value="5" onButtonClick={() => handleNumberClick("5")} />
        <NumberButton value="6" onButtonClick={() => handleNumberClick("6")} />
        <OperatorButton
          value="*"
          onButtonClick={() => handleOperatorClick("*")}
        />
      </div>
      <div>
        <NumberButton value="1" onButtonClick={() => handleNumberClick("1")} />
        <NumberButton value="2" onButtonClick={() => handleNumberClick("2")} />
        <NumberButton value="3" onButtonClick={() => handleNumberClick("3")} />
        <OperatorButton
          value="-"
          onButtonClick={() => handleOperatorClick("-")}
        />
      </div>
      <div>
        <NumberButton value="AC" onButtonClick={() => clear()} />
        <NumberButton value="0" onButtonClick={() => handleNumberClick("0")} />
        <NumberButton value="." onButtonClick={() => handleNumberClick(".")} />
        <OperatorButton
          value="+"
          onButtonClick={() => handleOperatorClick("+")}
        />
      </div>
      <EqualsButton value="=" onButtonClick={() => calculate()} />
    </>
  );
}

import { useState } from "react";
import styled from "styled-components";

type OperatorFunction = (a: number, b: number) => number;
type OperatorFunctions = {
  [key: string]: OperatorFunction;
};

const operatorfunctions = (): OperatorFunctions => ({
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
});

function App() {
  const [screenResult, setScreenResult] = useState("");
  const [result, setResult] = useState("");

  const numbersAndSymbols = [
    "+",
    "-",
    "*",
    "/",
    "7",
    "8",
    "9",
    "C",
    "4",
    "5",
    "6",
    "=",
    "1",
    "2",
    "3",
    "0",
    ".",
  ];

  const onClickElements = (el: string) => {
    if (el === "C") {
      reset();
    } else if (["/", "*", "+", "-"].includes(el)) {
      setScreenResult(screenResult.replace(/[+\-*/]/g, ""));
      setResult(state => state + el);
    } else {
      setScreenResult(state => state + el);
      setResult(state => state + el);
    }

    const resultLastCharacter = result[result.length - 1];
    if (["/", "*", "+", "-"].includes(resultLastCharacter)) {
      setScreenResult(el);
      return;
    }

    if (el === "=") {
      const splitOperator = result.split(/([+\-*/])/);
      if (splitOperator.length !== 3) {
        console.log(splitOperator);
        alert("숫자를 제대로 입력해 주세용!");
        reset();
      } else {
        console.log(splitOperator);
        const operators = operatorfunctions();
        const operationResult = operators[splitOperator[1]](
          Number(splitOperator[0]),
          Number(splitOperator[2])
        );

        const roundedResult = parseFloat(operationResult.toFixed(10));
        setResult(roundedResult.toString());
        setScreenResult(roundedResult.toString());
      }
    }
  };

  /*
  추가 예외처리
  1. 연산자가 연속 두번 클릭됨 -> 한번만 클릭되게
  2. 1번과 같은 이유로 1 + = 이런식으로 클릭해도 59번줄의 splitOperator.length가 3이 되면서 alert창이 안나옴
  
  */
  const reset = () => {
    setScreenResult("");
    setResult("");
  };

  // console.log(result, "result");
  // console.log(screenResult, "screenResult");

  return (
    <Container>
      <Title>Calculator</Title>
      <CalculatorContainer>
        <ResultContainer>{screenResult}</ResultContainer>

        <SymbolGroupContainer>
          {numbersAndSymbols.map((item, index) => {
            const isLargeLength = item === "=";
            const isLargeWidth = item === "0";

            return (
              <SymbolButton
                key={index}
                value={item}
                $isLargeLength={isLargeLength}
                $isLargeWidth={isLargeWidth}
                onClick={() => onClickElements(item)}
              >
                {item}
              </SymbolButton>
            );
          })}
        </SymbolGroupContainer>
      </CalculatorContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #ebeae3;
  gap: 30px;
`;

const Title = styled.span`
  font-size: 30px;
`;

const CalculatorContainer = styled.div`
  width: 356px;
  height: 510px;
  background-color: #ffc7c7;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* font-family: "Quantico", sans-serif !important; */
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px;
  width: 290px;
  height: 75px;
  border-radius: 6px;
  background-color: #d9eaed;
  box-shadow: inset 3px 3px 3px 0px #828282;
  font-family: "Galmuri9", sans-serif;
  font-size: 24px;
`;

const SymbolGroupContainer = styled.div`
  width: 290px;
  height: 340px;
  border-radius: 6px;
  background-color: transparent;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0.5rem;
`;

const SymbolButton = styled.button<{
  $isLargeWidth: boolean;
  $isLargeLength: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #fcadad;
  box-shadow: 1px 1px 2px 0px #857a7a;
  border: none;
  font-size: 19px;

  ${({ $isLargeLength }) =>
    $isLargeLength &&
    `  
    grid-row: span 3;
    background-color: #ff6969;
    `}

  ${({ $isLargeWidth }) =>
    $isLargeWidth &&
    `
    grid-column: span 2;
    background-color: #fcadad;

  `}
`;

export default App;

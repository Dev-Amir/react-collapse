import React, { useState } from 'react';
import { Collapse } from './Components';
import styles from './App.module.scss';

type tTimeout = 'very-slow' | 'slow' | 'medium' | 'fast' | 'very-fast' | number;

const App: React.FC = () => {
   const [isOpen, setIsOpen] = useState<boolean>(true);
   const [showHeightValue, setShowHeightValue] = useState<number>(100);
   const [isString, setIsString] = useState<boolean>(true);
   const [timeout, setTimeout] = useState<tTimeout>('medium');

   const setShowHeightHandler = (newValue: number): void => {
     const isNumber: boolean = Number.isInteger(newValue);

     if(isNumber && newValue >= 0 && newValue <= 100) {
      setShowHeightValue(newValue);
     }
   }

   const setTimeoutHandler = (newValue: tTimeout): void => {
     if(typeof newValue === 'number') {
      const isNumber: boolean = Number.isInteger(newValue);
      if(isNumber) {
        setTimeout(newValue);
        return;
      }
     }

     setTimeout(newValue);
   }

   const FormHandler = () => {

    return (
      <form>
        <button
          type="button"
          className={`${styles.Btn} ${styles.BtnPrimary}`}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          is show: {String(Boolean(isOpen))}
        </button>

        <br />
        <br />

        <input
          type="number"
          value={showHeightValue}
          className={styles.FormControle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShowHeightHandler(parseInt(event.target.value));
          }}
        />

        <br />
        <br />

        <label>is string time out:</label>
        <input
          type="checkbox"
          checked={isString}
          onChange={() => {
            setIsString((prev) => !prev);
          }}
        />

        <br />
        <br />

        {isString ? (
          <select
            value={timeout}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setTimeoutHandler(event.target.value as tTimeout);
            }}
          >
            <option value="very-slow">very-slow</option>
            <option value="slow">slow</option>
            <option value="medium">medium</option>
            <option value="fast">fast</option>
            <option value="very-fast">very-fast</option>
          </select>
        ) : (
          <input
            type="number"
            value={typeof timeout === "number" ? timeout : ""}
            className={styles.FormControle}
            placeholder="write second value"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTimeoutHandler(parseInt(event.target.value));
            }}
          />
        )}
      </form>
    );
   }

  return (
    <div className={styles.Container}>
      <FormHandler />

      <br />
      <br />
      <hr />
      <br />
      <br />

      <Collapse isOpen={isOpen} showHeight={showHeightValue} timeOut={timeout}>
        <div className={styles.Layout}>Collapse Children</div>
      </Collapse>
    </div>
  );
};

export default App;

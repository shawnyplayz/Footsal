import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import './Spinner.css'
import { Circles } from 'react-loader-spinner'

export const Spinner = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="fp-container spinner">
        <Circles
          color="#00BFFF" height={80} width={80}
          ariaLabel='three-dots-loading'
          wrapperStyle
          wrapperClass
        />
      </div>
    )
  );
};
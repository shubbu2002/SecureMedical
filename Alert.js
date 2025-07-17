import React, { useRef, useEffect } from "react";
import "./alert.css";
import { useSelector } from "react-redux";

const Alert = () => {
  const alertRef = useRef(null);
  const overlayRef = useRef(null);
  const { isPending, isError, isSuccessful } = useSelector((state) => state.medical.transaction);

  const removeHandler = () => {
    if (alertRef.current) {
      alertRef.current.className = "alert--remove hide";
    }
    if (overlayRef.current) {
      overlayRef.current.className = "overlay--remove hide";
    }
  };

  useEffect(() => {
    if (alertRef.current && overlayRef.current) {
      alertRef.current.className = "alert--remove show";
      overlayRef.current.className = "overlay--remove show";
    }
  }, [isPending, isError, isSuccessful]);

  return (
    <div>
      {(isPending || isError || isSuccessful) && (
        <div className="alert" onClick={removeHandler}>
          <div className="overlay--remove" ref={overlayRef}></div>
          <div className="alert--remove" ref={alertRef}>
            {isPending && <h2>Submitting data... Please wait</h2>}
            {isError && <h2>Transaction Failed</h2>}
            {isSuccessful && (
              <>
                <h2>Transaction Successful!</h2>
                {/* Optional: add txHash if needed */}
                {/* <div className="transactionHashOut"><a href={`https://etherscan.io/tx/${txHash}`} target="_blank">View on Etherscan</a></div> */}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;

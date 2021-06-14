import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

import './style.scss';
import Modal from '../Modal';
import Button from '../Button';
import { useSetRhinoState } from '../../../global/state';

const OtpModal = ({ email, isOpen, onClose, resendOtp, onSubmit, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setSnackbarData = useSetRhinoState('snackBarData');

  const handleModalClose = () => {
    setOtp('');
    onClose();
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setSnackbarData({ type: 'error', message: 'Please enter a valid OTP' });
      return;
    }
    setIsLoading(true);
    const isSubmitSuccess = await onSubmit(otp);
    setIsLoading(false);
    if (isSubmitSuccess) {
      handleModalClose();
      onSuccess();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className="otp-modal">
        <div className="otp-modal-top">
          <img className="otp-image" src="/assets/verification.webp" alt="Verification" />
          <h2 className="title">Enter OTP</h2>
          <p className="subtitle">
            We have send an OTP to <span>{email}</span>
          </p>
        </div>
        <div className="otp-modal-middle">
          <OtpInput shouldAutoFocus numInputs={6} value={otp} onChange={(value) => setOtp(value)} />
        </div>
        <div className="otp-modal-bottom">
          <ResendButton time={30} variant="secondary" onClick={resendOtp}>
            Resend OTP
          </ResendButton>
          <Button isLoading={isLoading} onClick={handleVerify}>
            Verify OTP
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const ResendButton = ({ time, onClick, children, ...props }) => {
  const [counter, setCounter] = useState(time);
  const [isLoading, setIsLoading] = useState(false);

  // Decrementing the countdown each second
  useEffect(() => {
    let timer;
    if (counter > 0) {
      const decrementCount = () => setCounter((initialCount) => initialCount - 1);
      timer = setTimeout(decrementCount, 1000);
    }
    return () => clearInterval(timer);
  }, [counter]);

  const isDisabled = counter > 0;

  const handleClick = async () => {
    setIsLoading(true);
    const x = await onClick();
    setIsLoading(false);
    if (x) setCounter(time);
  };

  return (
    <Button isLoading={isLoading} onClick={handleClick} disabled={isDisabled} {...props}>
      Resend OTP {isDisabled && `(${counter}s)`}
    </Button>
  );
};

export default OtpModal;

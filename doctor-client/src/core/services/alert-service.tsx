import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, AlertProps } from '@mui/material';

class AlertService {
  static showAlert(message: React.ReactNode, severity: 'error' | 'warning' | 'info' | 'success', duration: number = 5000) {
    const alertElement = document.createElement('div');
    document.body.appendChild(alertElement);

    const closeAlert = () => {
      ReactDOM.unmountComponentAtNode(alertElement);
      alertElement.remove();
    };

    ReactDOM.render(
      <Alert severity={severity} onClose={closeAlert} sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
        {message}
      </Alert>,
      alertElement
    );
    setTimeout(closeAlert, duration);
  }
}

export default AlertService;
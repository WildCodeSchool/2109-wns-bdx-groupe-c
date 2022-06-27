import { useState, createContext } from 'react';

interface ToastConfigType {
  severity: 'success' | 'info' | 'warning' | 'error';
  message: string;
};

interface ToastContextType {
  toastConfig: ToastConfigType | null;
  showToast: (severity: 'success' | 'info' | 'warning' | 'error', message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType>({
  toastConfig: null,
  showToast: () => {},
  hideToast: () => {},
});

export default ToastContext

interface Props {
  children: any;
}

export function ToastContextProvider(props: Props) {
  const { children } = props;
  const [toastConfig, setToastConfig] = useState<ToastConfigType | null>(null);

  function showToast(severity: 'success' | 'info' | 'warning' | 'error', message: string) {
    setToastConfig({ severity, message });
  }

  function hideToast() {
    setToastConfig(null);
  }

  return (
    <ToastContext.Provider value={{toastConfig, showToast, hideToast}}>
      {children}
    </ToastContext.Provider>
  )

}
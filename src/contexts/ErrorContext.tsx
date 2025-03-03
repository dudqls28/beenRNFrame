// src/contexts/ErrorContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import ErrorModal from '../components/ui/ErrorModal';

interface ErrorContextType {
  showError: (message: string, title?: string) => void;
  clearError: () => void;
  currentError: ErrorState | null;
}

interface ErrorState {
  message: string;
  title?: string;
}

const ErrorContext = createContext<ErrorContextType>({
  showError: () => {},
  clearError: () => {},
  currentError: null,
});

export const useError = () => useContext(ErrorContext);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<ErrorState | null>(null);

  const showError = (message: string, title?: string) => {
    setError({ message, title });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider
      value={{
        showError,
        clearError,
        currentError: error,
      }}
    >
      {children}
      <ErrorModal
        visible={error !== null}
        title={error?.title}
        message={error?.message || ''}
        onClose={clearError}
      />
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
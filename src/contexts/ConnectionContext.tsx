// src/contexts/ConnectionContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface ConnectionContextType {
  isConnected: boolean | null;
}

const ConnectionContext = createContext<ConnectionContextType>({
  isConnected: true,
});

export const useConnection = () => useContext(ConnectionContext);

interface ConnectionProviderProps {
  children: ReactNode;
}

export const ConnectionProvider: React.FC<ConnectionProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    // 네트워크 상태 변경 구독
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // 초기 상태 확인
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ConnectionContext.Provider value={{ isConnected }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionContext;
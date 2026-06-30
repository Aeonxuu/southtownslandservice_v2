import { createContext, useContext, useState } from 'react';

const QuoteModalContext = createContext(null);

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QuoteModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

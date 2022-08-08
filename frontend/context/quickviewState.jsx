import { createContext, useContext, useState } from 'react';
import QuickView from '../components/QuickView';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function QuickviewStateProvider({ children }) {
  const [dialogContent, setDialogContent] = useState('Please add content.');
  // Closed dialog by default
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleDialogContent(dialog) {
    setDialogOpen(true);
    setDialogContent(dialog);
  }

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function openDialog() {
    setDialogOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        dialogOpen,
        setDialogOpen,
        toggleDialog,
        closeDialog,
        openDialog,
        handleDialogContent,
      }}
    >
      {children}
      {dialogContent && (
        <QuickView
          content={dialogContent}
          dialogOpen={dialogOpen}
          closeDialog={closeDialog}
        />
      )}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the dialog local state
function useQuickview() {
  // We use a consumer here to access the local state
  const context = useContext(LocalStateContext);
  if (context === undefined) {
    throw new Error(
      'useQuickview must be used within a QuickviewStateProvider'
    );
  }

  return context;
}
export { QuickviewStateProvider, useQuickview };

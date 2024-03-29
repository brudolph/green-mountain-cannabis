import { createContext, useContext, useState } from 'react';
import QuickView from '../components/QuickView';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function DialogStateProvider({ children }) {
  const [dialogContent, setDialogContent] = useState('Please add content.');
  // Closed dialog by default
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogContent = (dialog) => {
    setDialogOpen(true);
    setDialogContent(dialog);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

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
function useDialog() {
  // We use a consumer here to access the local state
  const context = useContext(LocalStateContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogStateProvider');
  }

  return context;
}
export { DialogStateProvider, useDialog };

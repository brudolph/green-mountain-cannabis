import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function DialogStateProvider({ children }) {
  // Closed dialog by default
  const [dialogOpen, setDialogOpen] = useState(false);

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
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the dialog local state
function useDialog() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}
export { DialogStateProvider, useDialog };

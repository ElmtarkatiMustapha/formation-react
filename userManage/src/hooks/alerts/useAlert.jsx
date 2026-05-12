import { useCallback } from "react";
import { useToast } from "../../contexts/ToastContext";

const useAlert = () => {
  const { addToast } = useToast();

  const showAlert = useCallback((message, type = "info") => {
    addToast(message, type);
  }, []);

  return {
    showAlert,
  };
};

export default useAlert;

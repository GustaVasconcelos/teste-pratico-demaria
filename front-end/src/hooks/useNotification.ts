import { useCallback, useRef } from 'react';
import { toast, ToastOptions, ToastContent } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const useNotification = () => {
    const lastToastRef = useRef<string | number | null>(null);

    const showNotification = useCallback(
        (type: ToastType, message: ToastContent) => {
            if (message && toast[type]) {
                if (lastToastRef.current) {
                    toast.dismiss(lastToastRef.current);
                }

                const selectedTheme = localStorage.getItem("selected-theme") || "light"; 

                lastToastRef.current = toast[type](message, {
                    theme: selectedTheme as 'light' | 'dark',
                    onClose: () => {
                        lastToastRef.current = null;
                    },
                } as ToastOptions);
            }
        },
        []
    );

    return { showNotification };
};

export default useNotification;

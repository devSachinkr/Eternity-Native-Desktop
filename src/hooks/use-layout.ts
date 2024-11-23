import { useState } from "react";

export const useLayout = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const  onClose=()=>{
        window.ipcRenderer.send("closeApp");
    };
    return { isVisible, setIsVisible, onClose };
};

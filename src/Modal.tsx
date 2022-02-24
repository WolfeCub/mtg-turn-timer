import { FC } from "react";
import ReactDOM from "react-dom";

interface Props {
    showModal: boolean;
}

export const Modal: FC<Props> = ({ children, showModal }) => {
    if (! showModal) return null;

    const ref = document.getElementById('portal');
    
    return ReactDOM.createPortal(children, ref!);
};

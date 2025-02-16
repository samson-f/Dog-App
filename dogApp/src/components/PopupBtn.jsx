import { useState } from 'react';
import './css/popupBtn.css';

const PopupBtn = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div>
        <button 
            className='popupBtn'
            onClick={() => setIsOpen((prev) => !prev)}
        >{title}</button>
        <>
            {
                isOpen &&
                    <div className='popupBar'>
                        <button 
                            className='closePopupBtn'
                            onClick={() => setIsOpen(false)}
                        >X</button>
                        {children}
                    </div>
            }   
        </>
    </div>
    )
}

export default PopupBtn
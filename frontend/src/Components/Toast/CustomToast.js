import React,{ useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import useCustomeContext from '../Context/useCustomeContext';

function CustomToast() {
    const [delay, setDelay] = useState(3000)

    const {
        showToast,
        setShowToast,
        isSuccess,
        setIsSuccess,
        toastMessage, 
        setToastMessage,
        toastTitle,
        setToastTitle
    } = useCustomeContext();

    const backGround = isSuccess ? '#4AAE88' : '#E6443A'

    const closeToast = () => {
        setShowToast(false)
        setToastMessage('')
        setToastTitle('')

    }

    return (
        <ToastContainer containerPosition='fixed' position='top-center' className="p-3">
            <Toast
                style={{background: backGround, color: 'lightgray', opacity: '.9'}}
                onClose={ closeToast }
                show={ showToast}
                delay= { delay }
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">{ toastTitle }</strong>
                    <small>à l'instant</small>
                </Toast.Header>

                <Toast.Body style={{color: 'white'}}>
                 { toastMessage }
                </Toast.Body>
            </Toast>
      </ToastContainer>
    )
}

export default CustomToast;
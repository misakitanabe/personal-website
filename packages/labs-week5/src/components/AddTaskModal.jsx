import { useRef } from 'react';

function AddTaskModal(props) {
    const dialogueRef = useRef(null);

    function handleOverlayClick(e) {
        // if the click didn't originate from dialogue div or one of it's children, then close modal
        if (!dialogueRef.current.contains(e.target)) {
            props.onCloseRequested();
        }
    }

    return (
        props.isOpen 
        ? 
        (<div onClick={handleOverlayClick} className="absolute w-screen h-screen bg-blue-800/10">
            <div ref={dialogueRef} className="bg-white p-4 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex mb-4">
                    <h1 className="font-semibold">
                        {props.headerLabel}
                    </h1>
                    <button onClick={props.onCloseRequested} aria-label="Close" className="ml-auto">X</button>
                </div>
                {props.children}
            </div>
        </div>)
        :
        null
    );
}

export default AddTaskModal;
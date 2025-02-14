import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function Todo(props) {
    return (
        <li  className='p-1'>
            <label htmlFor={props.id}>
                <input type="checkbox" id={props.id} defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} /> {props.name}
            </label>
            <button onClick={() => props.deleteTask(props.id)}><FontAwesomeIcon icon={faTrashCan} title='delete' className="ml-5 text-gray-600" /></button>
        </li>
    );
}

export default Todo;
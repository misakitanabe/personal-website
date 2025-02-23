import "./styles/Components.css";

function Dropdown(props) {
    return (
        <div className="dropdown-container">
            <label for="options" className="dropdown-label">{props.label}</label>
            <select className="dropdown" id="options" name="options">
                <option value="action1">Action 1</option>
                <option value="action2">Action 2</option>
                <option value="action3">Action 3</option>
            </select>
        </div>
    );
}

export default Dropdown;
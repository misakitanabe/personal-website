import "./styles/Components.css";

function CategorySquare(props) {
    return (
        <div className="category-square">
            <div className="category-image-container">
                <img src={props.path} alt="green top" className="category-image"/>
            </div>
            <label>{props.label}</label>
        </div>
    );
}

export default CategorySquare;
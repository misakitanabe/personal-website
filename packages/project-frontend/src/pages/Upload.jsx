import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import './styles/Pages.css'

function Upload(props) {
    return (
        <div className="upload-page">
            <Header title="Upload Item"></Header>
            <input onChange={props.onChange} value={props.itemName} placeholder="Name Item" className="item-name-input"/>
            <div className="image-container">
                <UploadedImage />
            </div>
            <div className="row-container">
                <Dropdown label='Category' />
                <Dropdown label='Color' />
            </div>
            
            {/* <div className="category-container">
                
            </div>
            <div className="color-container">
                
            </div> */}
            <button className="save-button">Save</button>
                
        </div>
    );
}

export default Upload;
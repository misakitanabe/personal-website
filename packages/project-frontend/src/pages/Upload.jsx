import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import './styles/Pages.css'

function Upload(props) {
    return (
        <div className="upload-page">
            <Header title="Upload Item"></Header>
            <div className="upload-container">
                <input onChange={props.onChange} value={props.itemName} placeholder="Name Item" className="item-name-input"/>
                <div className="image-container">
                    <UploadedImage />
                </div>
                <div className="category-container">
                    <Dropdown label='Category' />
                </div>
                <div className="color-container">
                    <Dropdown label='Color' />
                </div>
                <button className="save-button">Save</button>
                
            </div>
        </div>
    );
}

export default Upload;
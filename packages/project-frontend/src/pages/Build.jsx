import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import CategorySquare from "../components/CategorySquare"
import './styles/Pages.css'

function Build(props) {
    return (
        <div className="upload-page">
            <Header title="Build Outfit"></Header>
            <div className="build-container">
                <input onChange={props.onChange} value={props.itemName} placeholder="Name Outfit" className="outfit-name-input"/>
                <div className="category-container-build">
                    <Dropdown label='Category' />
                </div>
                <div className="image-container">
                    <UploadedImage />
                </div>
                <section className="category-squares-grid">
                    <CategorySquare label="Tops" path="../../images/green-top.jpg" />
                    <CategorySquare label="Pants" path="../../images/jeans.png"/>
                    <CategorySquare label="Skirts" path="../../images/green-top.jpg"/>
                    <CategorySquare label="Shoes" path="../../images/green-top.jpg"/>
                    <CategorySquare label="Jackets" path="../../images/green-top.jpg"/>
                    <CategorySquare label="Accessories" path="../../images/green-top.jpg" />
                </section>
                <button className="save-button">Save</button>
            </div>
        </div>
    );
}

export default Build;
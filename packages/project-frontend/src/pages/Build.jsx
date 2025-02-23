import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import Dropdown from "../components/Dropdown";
import CategorySquare from "../components/CategorySquare"
import './styles/Pages.css'

function Build(props) {
    return (
        <div className="upload-page">
            <Header title="Build Outfit"></Header>
            <div className="row-container">
                <input onChange={props.onChange} value={props.itemName} placeholder="Name Outfit" className="outfit-name-input"/>
                <div className="category-container-build">
                    <Dropdown label='Category' />
                </div>
            </div>
            
            <div className="image-container">
                <UploadedImage />
            </div>
            <section className="category-squares-grid">
                {/* <div className="squares-first-row"> */}
                    <CategorySquare style={{ gridRow: 1, gridCol: 1 }} label="Tops" path="../../images/green-top.jpg" />
                    <CategorySquare style={{ gridRow: 1, gridCol: 2 }} label="Pants" path="../../images/jeans.png"/>
                    <CategorySquare style={{ gridRow: 1, gridCol: 3 }} label="Skirts" path="../../images/pink-skirt.webp"/>
                {/* </div>
                <div className="squares-second-row"> */}
                    <CategorySquare style={{ gridRow: 2, gridCol: 1 }} label="Shoes" path="../../images/shoe.jpg"/>
                    <CategorySquare style={{ gridRow: 2, gridCol: 2 }} label="Jackets" path="../../images/jacket.png"/>
                    <CategorySquare style={{ gridRow: 2, gridCol: 3 }} label="Accessories" path="../../images/necklace.jpg" />   
                {/* </div> */}
                

            </section>
            <button className="save-button">Save</button>
        </div>
    );
}

export default Build;
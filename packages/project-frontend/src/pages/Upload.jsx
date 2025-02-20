import { useState } from "react";
import Header from "../components/Header"
import UploadedImage from "../components/UploadedImage";
import './styles/Pages.css'

function Upload(props) {
    return (
        <div className="upload-page">
            <Header title="Upload Item"></Header>
            <div className="upload-container">
                <input onChange={props.onChange} value={props.itemName} placeholder="Name Item" className="item-name-input"/>
                <article className="image-container">
                    <UploadedImage />
                </article>

                <label for="options">Category</label>
                <select id="options" name="options">
                    <option value="action1">Action 1</option>
                    <option value="action2">Action 2</option>
                    <option value="action3">Action 3</option>
                </select>

                
            </div>
        </div>
    );
}

export default Upload;
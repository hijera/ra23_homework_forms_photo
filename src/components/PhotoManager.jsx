import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Photos from "./Photos";
import shortid from 'shortid';

PhotoManager.propTypes = {};

function PhotoManager(props) {
    const fileRef = useRef();
    const [photos, setPhoto] = useState([]);

    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', evt => {
                resolve(evt.currentTarget.result);
            });

            fileReader.addEventListener('error', evt => {
                reject(new Error(evt.currentTarget.error));
            });

            fileReader.readAsDataURL(file);
        });
    };

    const onRemovePhoto = id => {
        setPhoto(photos.filter(photo => photo.id !== id));
    };

    const handleSelect = async (evt) => {
        const files = [...evt.target.files];
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        setPhoto([...photos, ...urls.map(url => ({url: url, id: shortid.generate()}))]);
    };

    return (
        <div className={"manager"}>
            <form>
                <div className={"click-element"}>
                    <input type="file" className={"input-element"} multiple={true} ref={fileRef}
                           onChange={handleSelect}/>
                    <span className={'caption'}>Click to Select</span></div>
            </form>
            <Photos list={photos} removeHandle={onRemovePhoto}/>
        </div>
    );
}

export default PhotoManager;
import React from 'react';
import PropTypes from 'prop-types';

Photos.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })),
    removeHandle: PropTypes.func.isRequired
};

function Photos(props) {
    const {list, removeHandle} = props;
    return (
        <div className={"flex-photos"}>
            {list.map(item =>
                <div className={"photo-item"} key={item.id}>
                    <div className={'img-container'}>
                        <img src={item.url}/>
                    </div>
                    <button onClick={() => removeHandle(item.id)}>x</button>
                </div>
            )}
        </div>
    );
}

export default Photos;
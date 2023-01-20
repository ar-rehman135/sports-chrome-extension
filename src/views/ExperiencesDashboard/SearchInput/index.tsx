import React, { FC } from 'react';
import './style.scss';

import searchIcon from "../../../public/assets/experience/search.svg";
import vortexIcon from "../../../public/assets/experience/vortex.svg";

interface SearchInputInterface {
    search: (value: string) => void;
    toggleFilterModal: () => void;
}

const SearchInput: FC<SearchInputInterface> = (props) => {
    return (
        <div className="search_container">
            <div className="input_wrapper">
                <input
                    onChange={(event) => { props.search(event.target.value) }}
                    type="text"
                    placeholder="Search experiences"
                    className="search_input" />
                <img className="search_icon" src={searchIcon} alt="search" />
            </div>

            <button type="button" className="vortex_btn" onClick={props.toggleFilterModal}>
                <img src={vortexIcon} alt="HomePage" />
            </button>
        </div>
    )
}

export default SearchInput;

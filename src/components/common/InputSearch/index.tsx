import React from "react";

import "./styles.scss";

interface Props {
  searchHandler: React.FormEventHandler<HTMLInputElement>;
  addHandler?: React.FormEventHandler<HTMLAnchorElement>;
  placeholder?: string
}

export const InputSearch = ({ searchHandler, addHandler, placeholder }: Props) => {
  return (
    <div className="input-search">
      <input
        placeholder={placeholder}
        onInput={searchHandler}
        className="input-search__input"
        type="search"
        id="search-contacts"
      />
      <a onClick={addHandler} className="input-search__add">
        <img src="./assets/plus.png" alt="" />
      </a>
    </div>
  );
};

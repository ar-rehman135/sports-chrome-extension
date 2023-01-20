import React, { FC, SetStateAction, Dispatch } from 'react';
import './styles.scss';

interface Category {
    name: string;
    icon: string;
    backgroundColor: string;
    disabled: boolean;
}

interface CategoryFilterProps {
    setCategories: Dispatch<SetStateAction<any>>;
    categories?: Array<Category>;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ categories = [], setCategories }) => {
    const selectedItems = categories.filter((item) => !item.disabled) || [];
    const selectCategory = (name: string) => setCategories((prevState: Array<Category>) => {
        const newState = [ ...prevState ];
        const idx = prevState.findIndex((item: Category) => item.name === name);
        newState[idx].disabled = !newState[idx].disabled;
        return newState;
    });

    return (
        <div className="CategoryFilter">
            <div className="CategoryFilter__message">
                <span>Filter</span>
                <span className="CategoryFilter__message__circle">{selectedItems.length}</span>
            </div>
            <div className="CategoryFilter__list">
                <div className="CategoryFilter__list__category">
                    <label className="CheckboxContainer">
                        <input type="checkbox" />
                        <span className="CheckboxContainer__checkmark" />
                    </label>
                    <span>All Experiences</span>
                </div>
                {categories?.map((category) => (
                    <div className="CategoryFilter__list__category" key={category.name}>
                        <label className="CheckboxContainer">
                            <input type="checkbox" checked={!category.disabled} onChange={() => selectCategory(category.name)} />
                            <span className="CheckboxContainer__checkmark" />
                        </label>
                        <img src={category.icon} alt="icon"/>
                        <span>{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;

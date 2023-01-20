import React from "react";
import { CheckboxInputBox } from "./style";

interface Props {
    id: string,
    value: any,
    onChangeHandler: any,
    checked?: boolean
}

const CheckboxInput = ({id, value, onChangeHandler, checked }: Props) => {
    return (
            <CheckboxInputBox
                type="checkbox"
                id={id}
                onChange={onChangeHandler}
                value={value}
                checked={checked} />
    )
}

export default CheckboxInput;

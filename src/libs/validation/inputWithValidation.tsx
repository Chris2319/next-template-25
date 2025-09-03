import * as React from "react";

export const InputWithValidation = <T extends string | number>({value, label, onChange, type, required, valid, validationMessage}: {
    value: T;
    label: string;
    onChange: (val: T) => void;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    valid?: boolean;
    validationMessage?: string
}) => {
    return (
        <div>
            <label>{label}{required && !valid && <span>*</span>}</label>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value as T)}/>
            {!valid && <span>{validationMessage}</span>}
        </div>
    );
};

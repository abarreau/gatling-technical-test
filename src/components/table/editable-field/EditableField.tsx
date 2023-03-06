import { FC, FormEvent, ReactNode, useState } from 'react';

/**
 * When inserted inside a table, this component allows to edit the displayed value
 * @param value the value to display
 * @param onValueChange called when the input loses focus with the updated value
 */
export const EditableField: FC<{
    value: string,
    className?: string,
    onValueChange: (value: string) => void,
    children: ReactNode
}> = ({ children, value, onValueChange, className }) => {
    const [ isBeingEdited, setBeingEdited ] = useState<boolean>(false);
    const [ formValue, setFormValue ] = useState<string>(value);

    const onChange = (e: FormEvent<HTMLInputElement>): void => setFormValue(e.currentTarget.value);

    const onBlur = () => {
        setBeingEdited(false);
        onValueChange(formValue);
    };

    if(isBeingEdited) {
        return (<td className={className}>
            <input autoFocus={true} onBlur={onBlur} type="text" value={formValue} onChange={onChange}/>
        </td>);
    } else {
        return <td className={className} onClick={() => !isBeingEdited ? setBeingEdited(true) : ''}>{ children }</td>;
    }
};
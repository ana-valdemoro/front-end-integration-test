export const Input = ({onInputChange, people}: any): JSX.Element => {
    return <input type="text" onChange={(e) => onInputChange(e.currentTarget.value, people)} />
}

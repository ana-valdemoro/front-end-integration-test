interface IProps {
    onClick: () => void;
    text: string;
}


export const Button = ({onClick, text}: IProps) =>  {

    return (
        <button onClick={onClick}>{text}</ button>
    );
}
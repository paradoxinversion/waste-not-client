export const Button = (props) => {
    const {children, onClick, type, additonalStyles} = props;
    return (
        <button className={`btn ${additonalStyles}`} type={type} onClick={onClick}>{children}</button>
    )
}
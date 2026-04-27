export default function Button({label, name, color, handleClick=()=>null, role='button', disabled=false}) {
    return (
        <button className={color} onClick={handleClick} role={role} name={name} disabled={disabled}>{label}</button>
    )
}
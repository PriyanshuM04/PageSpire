export default function FormField ({
    label, name, value, onChange, error, type = "text", placeholder = "",
}) {
    return(
        <div className="field">
            <label htmlFor={name}>{label}</label>
            <input 
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={!!error}
            />
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}
export default function Field({ label, name, value, onChange, error, type = 'text', placeholder }) {
  return (
    <label className="field-group">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}

export const Filter = ({ setName, inputId, type, inputName, value }) => {
  return (
    <input
      onChange={setName}
      id={inputId}
      type={type}
      name={inputName}
      value={value}
    />
  );
};

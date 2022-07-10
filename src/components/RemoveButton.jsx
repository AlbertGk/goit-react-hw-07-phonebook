export const RemoveButton = ({ deletionHandler }) => {
  return (
    <button type="button" onClick={deletionHandler}>
      Delete
    </button>
  );
};

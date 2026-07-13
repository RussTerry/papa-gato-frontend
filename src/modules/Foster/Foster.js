// Foster.js
import Person from "../../components/Person/Person";

const Foster = ({
  fosterItems,
  setFosterItems,
  selectedAction,
  setSelectedAction,
}) => {
  return (
    <Person
      items={fosterItems}
      setItems={setFosterItems}
      selectedAction={selectedAction}
      setSelectedAction={setSelectedAction}
      role="Foster"
    />
  );
};
export default Foster;

// AnimalModel.js

const AnimalModel = {
  id: null, // used internally, never shown to user
  ownerId: null, // ◄ References unique ID from Owner table
  name: "",
  speciesId: null, // ◄ References unique ID from Species table
  breed: "",
  age: null,
  weight: null,
  gender: "",
  color: "",
  description: "",
  notes: "",
};

export default AnimalModel;

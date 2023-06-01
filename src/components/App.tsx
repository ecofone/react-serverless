import { List } from "./List";
import { useState } from "react";
import { photos } from "../data";
import Navbar from "./Navbar";
import { UploadForm } from "./Uploadform";
import { Input } from "../types";

function App() {
  const [inputs, setInputs] = useState<Input>({
    title: null,
    file: null,
    path: null,
  });
  const [items, setItems] = useState<string[]>(photos);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleOnChange = (event: any) => {
    const { name, value, files } = event.target;
    console.log(name, value, files);
    if (!name) {
      return;
    }
    if (name === "title") {
      setInputs({ ...inputs, title: value });
    } else {
      setInputs({
        ...inputs,
        file: files[0],
        path: URL.createObjectURL(files[0]),
      });
    }
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    if (inputs.path) {
      setItems([...items, inputs.path]);
    }
    setInputs({ title: null, file: null, path: null });
    setIsFormVisible(false);
  };

  const toggleFormVisible = () => setIsFormVisible(!isFormVisible);
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <button
          className="btn btn-success float-end"
          onClick={toggleFormVisible}
        >
          {isFormVisible ? "Close" : "+ Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm
          inputs={inputs}
          isVisible={isFormVisible}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />
        <h1>Gallery</h1>
        {`You have ${items.length} images`}
        <List items={items} />
      </div>
    </>
  );
}

export default App;

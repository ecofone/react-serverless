import { List } from "./List";
import { AppContextType } from "../types";
import { Layout } from "./Layout";
import { useContext } from "react";
import { AppContext } from "./Context";

const App = () => {
  const { state } = useContext(AppContext) as AppContextType;

  return (
    <Layout>
      <h1>Gallery</h1>
      {`You have ${state.items.length} images`}
      <List />
    </Layout>
  );
};

export default App;

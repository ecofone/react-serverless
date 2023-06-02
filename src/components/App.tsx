import { List } from "./List";
import { AppContextType } from "../types";
import { Layout } from "./Layout";
import { useContext, useEffect } from "react";
import { AppContext } from "./Context";

const App = () => {
  const { state, fetchItems } = useContext(AppContext) as AppContextType;
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <Layout>
      <h1>Gallery</h1>
      {`You have ${state.items.length} images`}
      <List />
    </Layout>
  );
};

export default App;

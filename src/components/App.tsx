import { List } from "./List";
import { AppContextType, AuthContextType } from "../types";
import { Layout } from "./Layout";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/FirestoreContext";
import { useAuthContext } from "../context/AuthContext";
const App = () => {
  const { state, fetchItems } = useContext(AppContext) as AppContextType;
  const { authenticate } = useAuthContext() as AuthContextType;
  useEffect(() => {
    fetchItems();
    authenticate();
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

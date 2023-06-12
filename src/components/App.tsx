import { List } from "./List";
import { AppContextType, AuthContextType } from "../types";
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
    <>
      <h1>Gallery</h1>
      <List items={state.items} />
    </>
  );
};

export default App;

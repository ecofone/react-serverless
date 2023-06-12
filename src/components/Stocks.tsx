import { useContext, useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { AppContext } from "../context/FirestoreContext";
import { AppContextType, AuthContextType } from "../types";
import { List } from "./List";

export const Stocks = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  const { state } = useContext(AppContext) as AppContextType;

  const ownItems = useMemo(() => {
    return state.items.filter(
      (item) =>
        item.user === currentUser?.displayName.split(" ").join("").toLowerCase()
    );
  }, [currentUser?.displayName, state.items]);
  return (
    <>
      <h1>My Stocks</h1>
      <List items={ownItems} />
    </>
  );
};

import { useContext } from "react";
import { DataContext } from "./DataContext";

export const useData = () => {
  return useContext(DataContext);
};

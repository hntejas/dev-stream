import { createContext, useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";

import axios from "axios";

const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    axios
      .get("https://dev-stream-api.hntejas.repl.co/videos")
      .then((response) => {
        setVideos(response.data.videos);
        setShowLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setShowLoading(false);
      });
  }, []);

  return (
    <>
      <DataContext.Provider value={{ videos }}>{children}</DataContext.Provider>
      <Modal isOpen={showLoading} closeModal={() => {}}>
        <Loader />
      </Modal>
    </>
  );
}

export const useData = () => {
  return useContext(DataContext);
};

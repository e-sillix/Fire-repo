import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { db, auth, storage } from "./config/firebase";

import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [viewers, setViewers] = useState(0);
  const [awarded, setAwarded] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const onSubmitMovie = async () => {
    console.log(awarded);
    try {
      await addDoc(moviesCollectionRef, {
        Name: newMovieTitle,
        Viewers: viewers,
        Awards: awarded,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "Movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "Movies", id);
    await updateDoc(movieDoc, { Name: updatedTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `TheFolder/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  const moviesCollectionRef = collection(db, "Movies");
  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <div className="App">
      <Header />
      <Auth />

      <div>
        <input
          placeholder="Movie title here"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Viewers"
          type="number"
          onChange={(e) => setViewers(Number(e.target.value))}
        />
        <input
          type="checkbox"
          id="award"
          onChange={(e) => setAwarded(e.target.checked)}
        />
        <label htmlFor="award">Awarded</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((l) => (
          <div key={l.id}>
            <h3 style={{ color: l.Awards ? "green" : "grey" }}>{l.Name}</h3>
            {l.Viewers} views
            <button onClick={() => deleteMovie(l.id)}>Delete this one</button>
            <br />
            <input
              placeholder="new title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(l.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;

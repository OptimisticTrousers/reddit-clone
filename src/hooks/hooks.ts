import {
  collection,
  query,
  orderBy,
  getDocs,
  DocumentData,
  where,
} from "firebase/firestore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilter = () => {
  async function filterNew() {
    const postsDocsRef = collection(db, "posts");

    const q = query(postsDocsRef, orderBy("createdAt", "desc"));

    // getDocs(q)
    //   .then((data: DocumentData) => {
    //     setFilteredPosts(data.docs);
    //   })
    //   .catch((error) => alert(`ERROR: ${error}`));

    const data = await getDocs(q);
    return data.docs;
  }

  async function filterTop() {
    const postsDocsRef = collection(db, "posts");

    const q = query(postsDocsRef, orderBy("voteStatus", "desc"));

    // getDocs(q)
    //   .then((data: DocumentData) => {
    //     setFilteredPosts(data.docs);
    //   })
    //   .catch((error) => alert(`ERROR: ${error}`));
    const data = await getDocs(q);
    return data.docs;
  }

  async function filterRising() {
    const postsDocsRef = collection(db, "posts");

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const q = query(
      postsDocsRef,
      where("createdAt", ">=", yesterday)
    );


    // getDocs(q)
    //   .then((data: DocumentData) => {
    //     setFilteredPosts(data.docs);
    //   })
    //   .catch((error) => alert(`ERROR: ${error}`));
    const data = await getDocs(q);

    const newData = data.docs.sort((a, b) => a.data().voteStatus - b.data().voteStatus)
    return newData;
  }

  return {
    filterNew,
    filterTop,
    filterRising,
  };
};

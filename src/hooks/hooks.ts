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
    // console.log(data)
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
    // console.log(data)
    return data.docs;
  }

  async function filterRising() {
    const postsDocsRef = collection(db, "posts");

    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const q = query(
      postsDocsRef,
      orderBy("voteStatus", "desc"),
      where("createdAt", ">=", startOfDay),
    );

    // getDocs(q)
    //   .then((data: DocumentData) => {
    //     setFilteredPosts(data.docs);
    //   })
    //   .catch((error) => alert(`ERROR: ${error}`));
    const data = await getDocs(q);
    return data.docs;
  }

  return {
    filterNew,
    filterTop,
    filterRising,
  };
};

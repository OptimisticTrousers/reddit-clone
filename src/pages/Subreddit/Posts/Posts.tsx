import {
  collection,
  doc,
  DocumentChange,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import Post from "../Post/Post";
import styles from "./Posts.module.css";
import { db } from "../../../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import { useAppSelector } from "../../../hooks/hooks";

interface Props {
  posts?: DocumentData
}

const Posts: React.FC<Props>= ({posts}) => {
  if(posts === undefined) {
    return <h1>Oopsies</h1>
  }
  return (
    <div styleName="container">
      {posts?.map((doc: DocumentData) => {
        const data = doc.data();
        return (
          <Link key={doc.id} to={`comments/${doc.id}`} state={{ ...data }}>
            <Post key={doc.id} data={data} renderHover={true} />
          </Link>
        );
      })}
    </div>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});

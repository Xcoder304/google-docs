import React, { useEffect, useLayoutEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Tooltip from "@mui/material/Tooltip";
import Document from "./Document";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";

function Douments() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState([]);
  const [loading, setloading] = useState(false);
  const [sortDocs, setSortDoc] = useState(true);

  // const fetchData = (orderVal) => {
  //   setloading(true);
  //   const userDocuments = collection(
  //     db,
  //     "UserDocuments",
  //     session?.user?.email,
  //     "documents"
  //   );
  //   const q = query(userDocuments, orderBy("time", orderVal));
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     setDocuments(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //     setloading(false);
  //   });
  // };

  useLayoutEffect(() => {
    setloading(true);
    const userDocuments = collection(
      db,
      "UserDocuments",
      session?.user?.email,
      "documents"
    );
    const q = query(userDocuments, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDocuments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setloading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // const SORT_DOCS = () => {
  //   setSortDoc(!sortDocs);
  //   if (sortDocs) {
  //     fetchData("desc");
  //   } else {
  //     fetchData("asc");
  //   }
  // };

  const DELECT_DOC = async (id) => {
    await deleteDoc(
      doc(db, "UserDocuments", session?.user?.email, "documents", id)
    );
  };

  return (
    <section className="my-5 bg-white pb-3">
      <div className="max-w-3xl mx-auto px-3">
        {/*  */}
        <div className="w-full flex item-center justify-between">
          <span className="text-googleTxt_light_2 text-base capitalize font-medium select-none">
            your recent documents
          </span>
          <Tooltip title="Sort">
            <IconButton size="medium" className="bg-slate-100">
              <SortByAlphaIcon className="text-2xl text-gray-500" />
            </IconButton>
          </Tooltip>
        </div>
        {/*  */}
        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center mt-7">
              <CircularProgress />
            </div>
          ) : documents.length == 0 ? (
            <div className="text-center">
              <h3 className="font-medium text-googleTxt_light_2 select-none text-xl">
                No text documents yet
              </h3>
              <p className="text-gray-400 font-normal select-none text-base">
                Create a new document to get started
              </p>
            </div>
          ) : (
            documents.map(({ id, data: { time, fileName } }, index) => {
              return (
                <Document
                  key={index}
                  id={id}
                  time={new Date(time?.toDate()).toDateString()}
                  fileName={fileName}
                  deleteDoc={DELECT_DOC}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Douments;

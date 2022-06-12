import React, { useEffect, useLayoutEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Tooltip from "@mui/material/Tooltip";
import Document from "./Document";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

function Douments() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<any[]>([]);

  useLayoutEffect(() => {
    const userDocuments = collection(
      db,
      "UserDocuments",
      session?.user?.email,
      "documents"
    );
    const q: any = query(userDocuments, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      setDocuments(
        snapshot.docs.map((doc: any) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

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
          {documents.map(({ id, data: { time, fileName } }, index) => {
            return (
              <Document
                key={index}
                id={id}
                time={new Date(time?.toDate()).toDateString()}
                fileName={fileName}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Douments;

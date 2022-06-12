import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { convertFromRaw, convertToRaw } from "draft-js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { data: session } = useSession();
  const router = useRouter();
  const [snapshot, setSnapshot] = useState(null);
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(
        db,
        "UserDocuments",
        session?.user?.email,
        "documents",
        id
      );
      const docData = await getDoc(docRef);
      setSnapshot(docData?.data());
    };

    getData();
  }, []);

  useEffect(() => {
    router.events.on("beforeHistoryChange", () => {
      alert("Are you sure you want to leave this page?");
    });
  }, [router]);

  useEffect(() => {
    if (snapshot?.editorData) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(snapshot?.editorData))
      );
    }
  }, [snapshot]);

  const onEditorStateChange = async (editorState: any) => {
    setEditorState(editorState);

    await setDoc(
      doc(db, "UserDocuments", session?.user?.email, "documents", id),
      {
        editorData: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="!flex !justify-center sticky top-0 z-50 !mx-auto"
        editorClassName="mt-7 shadow-md rounded-md  max-w-4xl mx-auto px-4 py-12 bg-white"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],

          blockType: {
            inDropdown: true,
            options: [
              "Normal",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
              "Blockquote",
              "Code",
            ],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            icon: "font",
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
        }}
      />
    </div>
  );
}

export default TextEditor;

"use client"

import { AddPostProvider } from "@/contexts/add-post-context";
import withAuth from "@/utils/withAuth";
import dynamic from "next/dynamic";
import AddPostForm from "./_components/add-post-form";
import { useAppContext } from "@/contexts/app-context";

const AddPostPage = () => {

    const { currentUser } = useAppContext();

    if (!currentUser) {
      return <></>
    }
  
    return (
        <AddPostProvider>
            <AddPostForm />
        </AddPostProvider>
    )
}

export default dynamic(() => Promise.resolve(withAuth(AddPostPage)), { ssr: false });


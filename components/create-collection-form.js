"use client";

import { useState } from "react";
import Button from "./ui/button";
import Input from "./ui/input";
import Textarea from "./ui/textarea";
import InputLabel from "./ui/input-label";
import createCollection from "@/actions/createCollection";
import { CgSpinner } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/data/firebase";

export default function CreateCollectionForm({ setIsCreateCollection }) {
  const [user, loading] = useAuthState(auth);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onNameChangeHandler(e) {
    setNewCollectionName(e.target.value);
  }

  function onDescriptionChangeHandler(e) {
    setNewCollectionDescription(e.target.value);
  }

  function onClickHandler() {
    setIsCreateCollection(false);
  }

  async function onSubmitHandler(e) {
    e.preventDefault();

    // Ensure that `user` is loaded before attempting to create a new collection
    if (!loading) {
      try {
        setIsSubmitting(true);
        const collectionData = {
          name: newCollectionName,
          description: newCollectionDescription,
          saved: [],
          numSaved: 0,
        };
        await createCollection(user.uid, collectionData);
        setIsCreateCollection(false);
        setIsSubmitting(false);
      } catch (error) {
        console.log(error);
        alert(
          "An error occured when attempting to create a new collection. Please try again later."
        );
      }
    }
  }

  return (
    <>
      <h3 className="font-medium">Create collection</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="h-56 mb-8 mt-6">
          <div className="size-full space-y-4">
            <div className="space-y-1">
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input onChange={onNameChangeHandler} id="name" required={true} />
            </div>
            <div className="space-y-1">
              <InputLabel htmlFor="description">Description</InputLabel>
              <Textarea
                onChange={onDescriptionChangeHandler}
                id="description"
                rows={4}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8">
          <Button onClick={onClickHandler} secondary type="button">
            Cancel
          </Button>
          <Button type="submit">
            Create
            {isSubmitting && <CgSpinner className=" size-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </>
  );
}

"use client";

import Button from "@/components/ui/button";
import ButtonGroup from "@/components/ui/button-group";

export default function SubmitFormSuccess({ setIsSubmitted }) {
  return (
    <div className="space-y-3 max-w-lg text-center">
      <h1 className="heading-2">Success!</h1>
      <p>
        The thumbnail you submitted has been sent for review and will be
        published shortly if it meets our submission guidelines.
      </p>
      <ButtonGroup>
        <Button onClick={() => setIsSubmitted(false)}>
          Submit another thumbnail
        </Button>
        <Button path="/" secondary>
          Explore thumbnails
        </Button>
      </ButtonGroup>
    </div>
  );
}

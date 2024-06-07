import Button from "./ui/button";
import ButtonGroup from "./ui/button-group";

export default function CollectionHeader({ name, description, numSaved }) {
  return (
    <div className="flex justify-between items-end py-8 w-full">
      <div className="max-w-lg space-y-4">
        <div className="space-y-1">
          <h1 className="heading-2">{name}</h1>
          <div className="text-sm text-slate-900">{numSaved} thumbnails</div>
        </div>
        <p className="text-sm">{description}</p>
      </div>
      <ButtonGroup>
        <Button secondary>Edit collection</Button>
        <Button secondary>Delete collection</Button>
      </ButtonGroup>
    </div>
  );
}

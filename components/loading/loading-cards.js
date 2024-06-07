import GridWrapper from "../layout/grid-wrapper";
import LoadingCard from "./loading-card";

export default function LoadingGrid({ rows }) {
  return (
    <GridWrapper>
      {Array.from({ length: 4 * rows }, (_, index) => (
        <LoadingCard key={index} />
      ))}
    </GridWrapper>
  );
}

interface Props {
  colors: string[];
}

export default function ProductBadge({
  colors,
}: Props) {
  return (
    <>
      <div>{colors.map((color, index) => badge(color, index))}</div>
    </>
  );
}

function badge(color: string, index: number) {
  const badgeClass = "badge filter rounded-4 bg-" + color;
  const badge = <span key={index} className={badgeClass}></span>
  
  return badge;
}


export default function Score({
  hits,
  errors,
}: {
  hits: number;
  errors: number;
}) {
  return (
    <div className="flex justify-center gap-5 my-5">
      <button className="btn">
        Hits
        <div className="badge badge-success">{hits}</div>
      </button>
      <button className="btn">
        Errors
        <div className="badge badge-error">{errors}</div>
      </button>
    </div>
  );
}

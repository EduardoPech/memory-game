export default function SkeletonLoaders() {
  const loaders = Array.from(Array(18).keys());

  return loaders.map((loader: any) => {
    return (
      <div key={loader} className="shadow">
        <div className="animate-pulse flex space-x-4">
          <div className="bg-slate-700 w-52 h-52"></div>
        </div>
      </div>
    );
  });
}

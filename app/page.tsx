import FormName from "./components/FormName";
import HeroGame from "./components/HeroGame";

export default function Home() {
  return (
    <div className="md:flex">
      <div className="py-5 md:flex-1 bg-gradient-to-r from-blue-700 to-purple-700 md:h-screen flex justify-center items-center">
        <HeroGame />
      </div>
      <div className="px-10 md:px-0 md:flex-1 h-[calc(100vh-104px)] md:h-screen bg-white flex justify-center items-center">
        <FormName />
      </div>
    </div>
  );
}

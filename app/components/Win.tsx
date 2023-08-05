import ImageWin from "../assets/images/win.png";
import Image from "next/image";
import Confetti from "./Confetti";

export default function Win({ resetGame }: any) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Confetti />
      <h2 className="text-4xl text-white">Congratulations!</h2>
      <Image
        src={ImageWin}
        alt="Win"
        width={500}
        height={500}
        className="user-drag-none"
      />
      <p className="text-3xl text-white my-5">You win the game</p>
      <button className="btn btn-primary" onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
}

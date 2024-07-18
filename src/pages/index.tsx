
import { Inter } from "next/font/google";
import  Main  from "./component/Landing";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div >
      <h1 className="text-center m-5 text-8xl">Assignment 1</h1>
      
      <Main />
    </div>
  );
}


import { Inter } from "next/font/google";
import  Main  from "./component/Landing";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div >
      
      <Main />
    </div>
  );
}

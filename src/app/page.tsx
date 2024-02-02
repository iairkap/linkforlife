import Image from "next/image";
import LoginForm from "./ui/loginForm";
import "./sass/pages/login.scss"
import { PrismaClient } from "@prisma/client";
import Flower from "../../public/flower.png"
const prisma = new PrismaClient();

export default function Home() {
  return (
    <main className="login-grid">
      <section className="login-section-1" >
        <h1>Log In</h1>
        <LoginForm />
      </section>
      <section className="login-section-2">
        <span>
          aca va a ir la imagen
        </span>
        <div className="vector">
          <Image src={Flower} alt="flower" width={250} />
        </div>
        <div className="vectorb">
          <Image src={Flower} alt="flower" width={150} />
        </div>
        <h2>bla</h2>
      </section>
    </main>
  );
}
import Hero from "@/components/hero";
import Main from "@/components/main";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Kamar & Harga</h1>
          <p className="py-3">Temukan akomodasi terbaik dengan harga terjangkau untuk kenyamanan menginap Anda.</p>
        </div>
        <Main />
      </div>
    </div>
  );
}
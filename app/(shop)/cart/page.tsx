import { TopNavBar, Footer, ShoppingCart } from "@/components";

export default function CartPage() {

  return (

    <main className="fade-in flex-grow pt-[104px] pb-xl px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col">
      <div className="mb-lg">
        <h1 className="font-headline-lg text-headline-lg md:font-headline-xl md:text-headline-xl text-primary tracking-tight">Tu Oratorio</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Revisa los artículos seleccionados antes de coordinar tu entrega.</p>
      </div>
      <ShoppingCart />
    </main>


  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PizzaOfTheDay } from "./PizzaOfTheDay";
import { Order } from "./Order";
import { Header } from "./Header";
import { CartContext } from "./contexts";

const App = () => {
  return (
    <StrictMode>
      <CartContext.Provider>
        <div>
          <Header />
          <PizzaOfTheDay />
          <Order />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

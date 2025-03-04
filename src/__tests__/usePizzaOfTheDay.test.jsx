import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay";
import { renderHook, waitFor } from "@testing-library/react";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "Some description",
  image: "/public/pizza/calabrese.webp",
  size: { S: 12.25, M: 16.25, L: 20.25 },
};
// function getPizzaOfTheDay() {
//   let pizza;
//   function TestComponent() {
//     pizza = usePizzaOfTheDay();
//     return null;
//   }
//   render(<TestComponent />);
//   return pizza;
// }

test("gives null when first called", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

test("to call the api and get back the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});

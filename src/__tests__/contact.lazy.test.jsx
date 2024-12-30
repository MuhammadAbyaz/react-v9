import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { Route } from "../routes/contact.lazy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createFetchMock from "vitest-fetch-mock";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const messageTextArea = screen.getByPlaceholderText("Message");

  const testData = {
    name: "Abyaz",
    email: "abyaz@yopmail.com",
    message: "testing",
  };
  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageTextArea.value = testData.message;

  const btn = screen.getByRole("button");
  btn.click();

  const h3 = await screen.findByRole("heading", { level: 3 });

  expect(h3.innerText).toContain("Submitted");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe("/api/contact");
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
});
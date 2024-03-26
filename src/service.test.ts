import { vi, expect, describe, it, afterAll } from "vitest";
import { getNobelPrizes } from "./service";

describe("Service Nobel", () => {
  const fetchSpy = vi.spyOn(global, "fetch");

  it("Expect to receive a Nobel Prizes list", async () => {
    const body = {
      prizes: [
        {
          year: "2022",
          category: "literature",
          laureates: [
            {
              id: "1017",
              firstname: "Annie",
              surname: "Ernaux",
              motivation:
                "for the courage and clinical acuity with which she uncovers the roots, estrangements and  collective restraints of personal memory",
            },
          ],
        },
      ],
    };
    const mockedImplementation = () =>
      Promise.resolve({
        json() {
          return body;
        },
      });
    fetchSpy.mockImplementation(mockedImplementation);
    const prizes = await getNobelPrizes();
    expect(prizes).toHaveLength(1);
  });

  it("Expect error if wrong data received", async () => {
    const body = { invalid: "key" };
    const mockedImplementation = () =>
      Promise.resolve({
        json() {
          return body;
        },
      });
    fetchSpy.mockImplementation(mockedImplementation);
    await expect(getNobelPrizes).rejects.toThrowError();
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });
});

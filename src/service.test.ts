import { mockFetch } from "fetch-mocked";
import { vi, expect, describe, it, afterEach } from "vitest";
import { getNobelPrizes } from "./service";

let mockedFetch = mockFetch(vi.fn);

describe("Service Nobel", () => {
  afterEach(() => {
    mockedFetch.mockReset();
  });
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
    mockedFetch.mockRequest("https://api.nobelprize.org/v1/prize.json", {
      body,
    });
    const prizes = await getNobelPrizes();
    expect(prizes).toHaveLength(1);
  });

  it("Expect error if wrong data received", async () => {
    const body = { invalid: "key" };
    mockedFetch.mockRequest("*", { body });
    await expect(getNobelPrizes).rejects.toThrowError();
  });
});

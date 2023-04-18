import createFetchMock from "vitest-fetch-mock";
import { vi, expect, describe, beforeEach, it } from "vitest";
import { getNobelPrizes } from "./service";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe("Service Nobel", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
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
        fetchMock.mockResponseOnce(JSON.stringify(body));
        const prizes = await getNobelPrizes();
        expect(prizes).toHaveLength(1);
    });

    it("Expect error if wrong data received", async () => {
        const body = { invalid: "key" };
        fetchMock.mockResponseOnce(JSON.stringify(body));
        await expect(getNobelPrizes).rejects.toThrowError();
    });
});

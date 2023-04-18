import { Prize, PrizeResponseSchema } from "./model";

export const getNobelPrizes = async (): Promise<Prize[]> => {
    const response = await fetch("https://api.nobelprize.org/v1/prize.json");
    // data received cannot be trusted at runtime
    const data: unknown = await response.json();
    // ensure data type Prize
    const result = PrizeResponseSchema.safeParse(data);
    if (!result.success) {
        throw Error("Error parsing prizes");
    } else {
        return result.data.prizes;
    }
};

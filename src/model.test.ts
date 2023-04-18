import { it, describe, expect, assertType } from "vitest";
import {
    Laureate,
    LaureateSchema,
    NobelCategory,
    NobelCategorySchema,
    Prize,
    PrizeSchema,
} from "./model";

describe("Nobel prize model", () => {
    describe("Nobel Category ", () => {
        it("should validate Nobel Category", () => {
            const category = "chemistry";
            const result = NobelCategorySchema.safeParse(category);

            expect(result.success).toStrictEqual(true);
            if (result.success) {
                const model: NobelCategory = result.data;
                expect(model).toStrictEqual("chemistry");
            }
        });

        it("should not validate if not in enum", () => {
            const category = "invalid";
            const result = NobelCategorySchema.safeParse(category);

            expect(result.success).toStrictEqual(false);
        });
    });
    describe("Nobel Laureate ", () => {
        it("should validate with all fields", () => {
            const laureate = {
                id: 3,
                firstname: "John",
                surname: "Doe",
                motivation: "To be known",
            };

            const result = LaureateSchema.safeParse(laureate);

            expect(result.success).toStrictEqual(true);
            if (result.success) {
                const model: Laureate = result.data;
                expect(model.firstname).toStrictEqual("John");
                expect(model.surname).toStrictEqual("Doe");
                expect(model.motivation).toStrictEqual("To be known");
            }
        });

        it("should validate with optional fields", () => {
            const laureate = {
                id: "55",
                motivation: "To be known",
            };
            const result = LaureateSchema.safeParse(laureate);

            expect(result.success).toStrictEqual(true);
            if (result.success) {
                const model: Laureate = result.data;
                expect(model.id).toStrictEqual(55);
                expect(model.firstname).toStrictEqual("🧐 John Doe ?");
                expect(model.surname).toStrictEqual(undefined);
                expect(model.motivation).toStrictEqual("To be known");
            }
        });
        it("should not validate if invalid field", () => {
            const laureate = "invalid";
            const result = LaureateSchema.safeParse(laureate);

            expect(result.success).toStrictEqual(false);
        });
    });
    describe("Nobel Prize ", () => {
        it("should validate with laureates", () => {
            const prize: Prize = {
                year: 1950,
                category: "peace",
                laureates: [{ id: 666, firstname: "Zod", motivation: "supertyping" }],
            };

            const result = PrizeSchema.safeParse(prize);

            expect(result.success).toStrictEqual(true);
            if (result.success) {
                const model: Prize = result.data;
                expect(model.year).toStrictEqual(1950);
                expect(model.category).toStrictEqual("peace");
                expect(model.laureates).toHaveLength(1);
                expect(model.overallMotivation).toBeUndefined();
            }
        });

        it("should validate with no laureates but overall motivation", () => {
            const prize: Prize = {
                year: 1950,
                category: "peace",
                overallMotivation: "No peace in war...",
            };

            const result = PrizeSchema.safeParse(prize);

            expect(result.success).toStrictEqual(true);
            if (result.success) {
                const model: Prize = result.data;
                expect(model.year).toStrictEqual(1950);
                expect(model.category).toStrictEqual("peace");
                expect(model.overallMotivation).toStrictEqual("No peace in war...");
                expect(model.laureates).toBeUndefined();
            }
        });
        it("should not validate with no laureates and no overallMotivation", () => {
            const prize: Prize = {
                year: 1980,
                category: "peace",
                laureates: undefined,
                overallMotivation: undefined,
            };
            const result = PrizeSchema.safeParse(prize);

            expect(result.success).toStrictEqual(false);
            if (!result.success) {
                expect(result.error.issues[0]).toHaveProperty("path", ["laureates"]);
            }
        });
        it("should not validate with invalid date", () => {
            const prize: Prize = {
                year: 1600,
                category: "peace",
                laureates: [{ id: 666, firstname: "Zod", motivation: "supertyping" }],
            };
            const result = PrizeSchema.safeParse(prize);

            expect(result.success).toStrictEqual(false);
            if (!result.success) {
                expect(result.error.issues[0]).toHaveProperty("path", ["year"]);
            }
        });

        it("should not validate if invalid field", () => {
            const prize = "invalid";
            const result = PrizeSchema.safeParse(prize);

            expect(result.success).toStrictEqual(false);
        });
    });
});

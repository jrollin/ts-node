import { Prize } from "./model";

export const displayNobelPrizes = (prizes: Prize[]) => {
    prizes.map((p) => {
        let line = `${p.year}: ${p.category} : `;
        if (p.laureates) {
            line += p.laureates
                .flatMap((p) => `${p.firstname} ${p.surname ?? ""}`)

                .join(" + ");
        } else {
            line += `💥 ${p.overallMotivation ?? ""}`;
        }
        console.log(line);
    });
};

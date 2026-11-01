import type { Pokerhand } from "./Pokerhand";
import type { PlayingCard } from "../Card/PlayingCard";

//verdier til tall
const cardValues: Record<PlayingCard["value"], number> = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};

//Her sjekkes det spillerens 5 kort og returnerer pokerhånd eller null hvis ingen kombinasjon finnes

export function checkPokerHand(
    hand: PlayingCard[]): Pokerhand | null {
        if (hand.length !== 5) {
            return null;
        }

//kortverdier etter tall og sorteres
const values = hand
.map((card) => cardValues[card.value])
.sort((a, b) => a-b);

//sjekkes hvis kort har samme farge
const isFlush = hand.every(
    (card) => card.color === hand[0].color
);

//hvis sammenhengde verdier
const isStraight =
values.every(
    (value, index) => index === 0 || value === values[index - 1] + 1
)

//royal flush samme farge
//join kombinerer array elementer som skal ha "," mellom hverandre 
//og så blir det true hvis de er nøyaktig det som står på høyre
const isRoyalFlush = 
isFlush &&
values.join(",") === "10,11,12,13,14";

//hvor mange ganger hver kort verdi vises
//reduce array-metode som itererer gjennom alle elementene og gradvis bygger opp et enkelt resultat
const counts = Object.values(
    hand.reduce<Record<string, number>>((result, card) => {
        result[card.value] = (result[card.value] || 0) +1;
        return result;
    },
    {})
).sort((a, b) => b-a);

//her sjekkes kombinasjoner fra sterkeste
if (isRoyalFlush) {
    return "royal-flush";
}    
if (isFlush && isStraight) {
    return "straight-flush";
}
if(counts[0] === 4) {
    return "four-of-a-kind";
}
if(counts[0] === 3 && counts [1] === 2){
    return "full-house";
}
if (isFlush) {
    return "flush";
}
if(isStraight) {
    return "straight";
}
if(counts[0] === 3) {
    return "three-of-a-kind";
}
if(counts[0] === 2 && counts[1] === 2) {
    return "two-pair";
}
if(counts[0] === 2) {
    return "one-pair";
}
return null;
}

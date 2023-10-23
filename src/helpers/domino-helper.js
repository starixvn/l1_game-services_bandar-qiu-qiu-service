export const isBigDomino = (domino) => {
    const dominoesValid = ["05", "06", "15", "16", "24", "25", "26", "34", "35", "36", "45", "46", "56"];
    return dominoesValid.includes(domino);
};

export const isDoubleDomino = (domino) => {
    return domino?.length === 2 && domino[0] === domino[1];
};

export const getTotalPipsOnDomino = (domino) => {
    return +domino[0] + +domino[1];
};

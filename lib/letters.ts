import lettersData from '../data/letters.json';

export interface Letter {
    id: string;
    content: string;
    nickname?: string;
    category?: string;
    createdAt: string;
}

// In-memory storage for new letters (will be lost on page refresh)
let newLetters: Letter[] = [];

export function getAllLetters(): Letter[] {
    return [...lettersData, ...newLetters];
}

export function getLettersByCategory(category: string): Letter[] {
    return getAllLetters().filter((letter) => letter.category === category);
}

export function getShuffledLetters(limit: number = 50): Letter[] {
    const allLetters = getAllLetters();
    const shuffled = [...allLetters].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
}

export function addLetter(letter: Omit<Letter, 'id' | 'createdAt'>): Letter {
    const newLetter: Letter = {
        ...letter,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    };
    newLetters.push(newLetter);
    return newLetter;
}

export function getRecentLetters(limit: number = 3): Letter[] {
    return getAllLetters()
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, limit);
}

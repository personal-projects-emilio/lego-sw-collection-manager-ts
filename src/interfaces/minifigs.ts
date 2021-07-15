export interface Minifig {
  id: string;
  characterName: string;
  name: string;
  possessed: boolean;
  tags: string[];
}

export type MinifigsList = Minifig[];

export interface TagOrCharacName {
  name: string;
  amount: number;
}

export type TagOrCharacNameList = TagOrCharacName[]
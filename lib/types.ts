export enum AppScreen {
  HOME = "HOME",
  FORM = "FORM",
  LOADING = "LOADING",
  RESULTS = "RESULTS",
  SAVED = "SAVED",
}

export type ChildProfile = {
  age: string | number;
  gender: string;
  interests: string[];
  budget: string;
  learningFocus: string[];
};

export type GiftRecommendation = {
  id: string;
  name: string;
  skills: string[];
  why: string;
  activity: string;
  price: string;
  image: string;
  onlineShops?: Array<{
    name: string;
    url: string;
    note?: string;
  }>;
};


export interface AboutPillar {
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
  title: string;
  history: string;
  address: string;
  contact: string;
  schedule: string;
  pillars: AboutPillar[];
}

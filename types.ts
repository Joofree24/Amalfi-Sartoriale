export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AnalysisResult {
  title: string;
  fabric: string;
  occasion: string;
  advice: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  application: 'Interno' | 'Externo' | 'Área Molhada' | 'Comercial';
  image: string;
  description: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum ChatState {
  INITIAL = 'INITIAL',
  QUALIFYING = 'QUALIFYING',
  READY = 'READY'
}

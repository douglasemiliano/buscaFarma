import { Avaliacao } from "./avaliacao";

export interface Farmacia {
  nome: string;
  longLat: number[];
  nomeFantasia: string;
  endereco: Endereco;
  produtos: string [];
  avaliacoes: Avaliacao[];
}

export interface Endereco {
    rua: string,
    numero: string,
    bairro: string,
    municipio: string,
    estado: string
}
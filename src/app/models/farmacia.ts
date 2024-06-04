export interface Farmacia {
  nome: string;
  longLat: number[],
  nomeFantasia: string,
  endereco: Endereco,
  produtos: any []
}

export interface Endereco {
    rua: string,
    numero: string,
    bairro: string,
    municipio: string,
    estado: string
}
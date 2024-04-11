export interface Farmacia {
  nome: string;
  longLat: number[],
  nomeFantasia: string,
  endereco: Endereco
}

export interface Endereco {
    rua: "AVENIDA GERALDO BARBOSA",
    numero: string,
    bairro: string,
    municipio: string,
    estado: string
}
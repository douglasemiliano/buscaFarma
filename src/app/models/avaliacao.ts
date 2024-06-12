export class Avaliacao {
  comentario: string;
  informacoes: InformacoesBasicas;
  produtos: string[];
  rating: number;
  estruturaFarmacia: EstruturaFarmacia;
  dataAvaliacao: Date;

  constructor(comentario: string, informacoes: InformacoesBasicas, produtos: string[], rating:number, estruturaFarmacia: EstruturaFarmacia){
    this.comentario = comentario;
    this.informacoes = informacoes;
    this.produtos = produtos;
    this.rating = rating;
    this.estruturaFarmacia = estruturaFarmacia;
    this.dataAvaliacao = new Date();
  }
}

export class EstruturaFarmacia {
  horario: string;
  isProdutoDisponivel: boolean;
  tipoProduto: string;
  fila: string;
  qualidadeAtendimento: string; 
}

export class InformacoesBasicas {
  aniversario: string;
  gender: string;
}

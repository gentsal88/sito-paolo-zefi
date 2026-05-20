import { Injectable } from '@nestjs/common';

export interface Publication {
  id: string;
  title: string;
  type: 'libro' | 'articolo' | 'ricerca';
  description: string;
  year: number;
  icon: string;
}

@Injectable()
export class PublicationsService {
  private publications: Publication[] = [
    {
      id: '1',
      icon: 'fa-solid fa-book',
      type: 'libro',
      title: 'Skanderbeg e la Lega di Alessio',
      description:
        "Un'approfondita ricerca su Gjergj Kastrioti e la resistenza albanese del XV secolo.",
      year: 2020,
    },
    {
      id: '2',
      icon: 'fa-solid fa-scroll',
      type: 'articolo',
      title: 'La Fortezza di Lezha nel Medioevo',
      description:
        'Analisi architectonica e storica della fortezza durante il dominio veneziano.',
      year: 2018,
    },
    {
      id: '3',
      icon: 'fa-solid fa-file',
      type: 'ricerca',
      title: 'Archivi della Lega Alessiana',
      description:
        'Documentazione e catalogo dei manoscritti e archivi relativi al patto del 1444.',
      year: 2019,
    },
    {
      id: '4',
      icon: 'fa-solid fa-book',
      type: 'libro',
      title: 'Toponimi Storici dell\'Albania del Nord',
      description:
        'Ricerca etimologica sui nomi geografici e loro significato storico-culturale.',
      year: 2017,
    },
    {
      id: '5',
      icon: 'fa-solid fa-scroll',
      type: 'articolo',
      title: 'Il Memoriale di San Nicola',
      description:
        'Studio del monumento funebre e della sua importanza nella memoria collettiva.',
      year: 2021,
    },
    {
      id: '6',
      icon: 'fa-solid fa-file',
      type: 'ricerca',
      title: 'Genealogia della Nobiltà Albanese',
      description:
        'Ricostruzione genealogica delle famiglie principesche albanesi nel XV secolo.',
      year: 2015,
    },
  ];

  async findAll(): Promise<Publication[]> {
    return this.publications;
  }

  async findById(id: string): Promise<Publication | undefined> {
    return this.publications.find((pub) => pub.id === id);
  }
}

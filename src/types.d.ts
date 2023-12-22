type PreviewTableRow = {
  titulo: string;
  inicio: Date;
  final: Date;
  local: string;
  instrutor: string;
  descricao: string;
  turma: string;
};

type Team = {
  nome: string;
  turno: string;
};

type BackendEvent = {
  titulo: string;
  data_inicio: string;
  data_fim: string;
  descricao: string;
  id: string;
  id_turma: string;
  instrutor: string;
  local: string;
  titulo: string;
};

type CalendarEvent = {
  start: string;
  end: string;
  title: string;
  content: string;
  class: string;
  split: string;
};

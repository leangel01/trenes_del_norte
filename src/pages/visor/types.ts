export interface Proyecto {
  ID: number;
  FASE_ID: number;
  PADRE_ID: number | null;
  TIPO: 'FASE' | 'RUTA';
  NOMBRE: string;
  LONGITUD: number | null;
  INV_EST: number | null;
  RUTA: string | null;
}

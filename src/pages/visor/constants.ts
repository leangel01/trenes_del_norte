import { Proyecto } from "./types";

export interface PhaseTheme {
  id: number;
  name: string;
  color: string;       // Primary color
  bgColor: string;     // Light background for cards
  textColor: string;   // Text color for contrast
  shadowColor: string; // Shadow for active glow
}

export const PHASE_THEMES: Record<number, PhaseTheme> = {
  1: {
    id: 1,
    name: "Fase 1",
    color: "#165444", // Teal green
    bgColor: "#E3EFE9",
    textColor: "#0C3C30",
    shadowColor: "rgba(22, 84, 68, 0.4)",
  },
  2: {
    id: 2,
    name: "Fase 2",
    color: "#83193E", // Raspberry burgundy
    bgColor: "#F3E2E7",
    textColor: "#540A23",
    shadowColor: "rgba(131, 25, 62, 0.4)",
  },
  3: {
    id: 3,
    name: "Fase 3",
    color: "#9A7129", // Bronze gold
    bgColor: "#F7EFE1",
    textColor: "#6B4912",
    shadowColor: "rgba(154, 113, 41, 0.4)",
  },
  4: {
    id: 4,
    name: "Fase 4",
    color: "#CAB15C", // Pale sand gold
    bgColor: "#FAF6E8",
    textColor: "#8A7426",
    shadowColor: "rgba(202, 177, 92, 0.4)",
  },
};

export const FALLBACK_PROJECTS: Proyecto[] = [
  // FASES
  { ID: 1, FASE_ID: 1, PADRE_ID: null, TIPO: "FASE", NOMBRE: "Fase 1", LONGITUD: 787.5, INV_EST: null, RUTA: null },
  { ID: 2, FASE_ID: 2, PADRE_ID: null, TIPO: "FASE", NOMBRE: "Fase 2", LONGITUD: 1335.0, INV_EST: null, RUTA: null },
  { ID: 3, FASE_ID: 3, PADRE_ID: null, TIPO: "FASE", NOMBRE: "Fase 3", LONGITUD: 701.0, INV_EST: null, RUTA: null },
  { ID: 4, FASE_ID: 4, PADRE_ID: null, TIPO: "FASE", NOMBRE: "Fase 4", LONGITUD: 552.0, INV_EST: null, RUTA: null },

  // ROUTES
  // Fase 1 routes
  { ID: 101, FASE_ID: 1, PADRE_ID: 1, TIPO: "RUTA", NOMBRE: "AIFA-Pachuca", LONGITUD: 57.0, INV_EST: null, RUTA: null },
  { ID: 102, FASE_ID: 1, PADRE_ID: 1, TIPO: "RUTA", NOMBRE: "México-Querétaro", LONGITUD: 226.0, INV_EST: null, RUTA: null },
  { ID: 103, FASE_ID: 1, PADRE_ID: 1, TIPO: "RUTA", NOMBRE: "Querétaro-Irapuato", LONGITUD: 108.2, INV_EST: null, RUTA: null },
  { ID: 104, FASE_ID: 1, PADRE_ID: 1, TIPO: "RUTA", NOMBRE: "Saltillo - Nuevo Laredo", LONGITUD: 396.3, INV_EST: null, RUTA: null },

  // Fase 2 routes
  { ID: 201, FASE_ID: 2, PADRE_ID: 2, TIPO: "RUTA", NOMBRE: "Irapuato - Guadalajara", LONGITUD: 310.0, INV_EST: null, RUTA: null },
  { ID: 202, FASE_ID: 2, PADRE_ID: 2, TIPO: "RUTA", NOMBRE: "Querétaro-San Luis Potosí", LONGITUD: 274.0, INV_EST: null, RUTA: null },
  { ID: 203, FASE_ID: 2, PADRE_ID: 2, TIPO: "RUTA", NOMBRE: "San Luis Potosí - Saltillo", LONGITUD: 310.0, INV_EST: null, RUTA: null },
  { ID: 204, FASE_ID: 2, PADRE_ID: 2, TIPO: "RUTA", NOMBRE: "Mazatlán - Los Mochis", LONGITUD: 441.0, INV_EST: null, RUTA: null },

  // Fase 3 routes
  { ID: 301, FASE_ID: 3, PADRE_ID: 3, TIPO: "RUTA", NOMBRE: "Guadalajara-Tepic", LONGITUD: 204.0, INV_EST: null, RUTA: null },
  { ID: 302, FASE_ID: 3, PADRE_ID: 3, TIPO: "RUTA", NOMBRE: "Los Mochis-Guaymas", LONGITUD: 362.0, INV_EST: null, RUTA: null },
  { ID: 303, FASE_ID: 3, PADRE_ID: 3, TIPO: "RUTA", NOMBRE: "Guaymas-Hermosillo", LONGITUD: 135.0, INV_EST: null, RUTA: null },

  // Fase 4 routes
  { ID: 401, FASE_ID: 4, PADRE_ID: 4, TIPO: "RUTA", NOMBRE: "Tepic-Mazatlán", LONGITUD: 275.0, INV_EST: null, RUTA: null },
  { ID: 402, FASE_ID: 4, PADRE_ID: 4, TIPO: "RUTA", NOMBRE: "Hermosillo-Nogales", LONGITUD: 277.0, INV_EST: null, RUTA: null },
];

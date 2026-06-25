import React from "react";
import { theme as antdTheme } from "antd";
import { PHASE_THEMES } from "../constants";

const { useToken } = antdTheme;

interface MexicoMapProps {
  hoveredRoute: string | null;
  onHoverRoute: (routeName: string | null) => void;
}

export const MexicoMap: React.FC<MexicoMapProps> = ({
  hoveredRoute,
  onHoverRoute,
}) => {
  const { token } = useToken();

  // Coordinates for the railway nodes
  const nodes: Record<string, { x: number; y: number; label: string }> = {
    "México / AIFA": { x: 260, y: 350, label: "CDMX/AIFA" },
    "Pachuca": { x: 290, y: 330, label: "Pachuca" },
    "Querétaro": { x: 220, y: 310, label: "Querétaro" },
    "Irapuato": { x: 180, y: 320, label: "Irapuato" },
    "Guadalajara": { x: 130, y: 330, label: "Guadalajara" },
    "Tepic": { x: 100, y: 300, label: "Tepic" },
    "Mazatlán": { x: 80, y: 250, label: "Mazatlán" },
    "Los Mochis": { x: 60, y: 190, label: "Los Mochis" },
    "Guaymas": { x: 45, y: 130, label: "Guaymas" },
    "Hermosillo": { x: 40, y: 90, label: "Hermosillo" },
    "Nogales": { x: 35, y: 35, label: "Nogales" },
    "San Luis Potosí": { x: 200, y: 260, label: "SL Potosí" },
    "Saltillo": { x: 195, y: 190, label: "Saltillo" },
    "Nuevo Laredo": { x: 220, y: 120, label: "N. Laredo" },
  };

  // Define route paths mapping route names to connections
  const routes = [
    // Fase 1
    { name: "AIFA-Pachuca", from: "México / AIFA", to: "Pachuca", phase: 1 },
    { name: "México-Querétaro", from: "México / AIFA", to: "Querétaro", phase: 1 },
    { name: "Querétaro-Irapuato", from: "Querétaro", to: "Irapuato", phase: 1 },
    { name: "Saltillo - Nuevo Laredo", from: "Saltillo", to: "Nuevo Laredo", phase: 1 },
    
    // Fase 2
    { name: "Irapuato - Guadalajara", from: "Irapuato", to: "Guadalajara", phase: 2 },
    { name: "Querétaro-San Luis Potosí", from: "Querétaro", to: "San Luis Potosí", phase: 2 },
    { name: "San Luis Potosí - Saltillo", from: "San Luis Potosí", to: "Saltillo", phase: 2 },
    { name: "Mazatlán - Los Mochis", from: "Mazatlán", to: "Los Mochis", phase: 2 },
    
    // Fase 3
    { name: "Guadalajara-Tepic", from: "Guadalajara", to: "Tepic", phase: 3 },
    { name: "Los Mochis-Guaymas", from: "Los Mochis", to: "Guaymas", phase: 3 },
    { name: "Guaymas-Hermosillo", from: "Guaymas", to: "Hermosillo", phase: 3 },
    
    // Fase 4
    { name: "Tepic-Mazatlán", from: "Tepic", to: "Mazatlán", phase: 4 },
    { name: "Hermosillo-Nogales", from: "Hermosillo", to: "Nogales", phase: 4 },
  ];

  const hasHoveredActive = hoveredRoute !== null;

  return (
    <div
      style={{
        background: token.colorBgContainer,
        borderRadius: "16px",
        padding: "20px",
        border: `1px solid ${token.colorBorderSecondary}`,
        boxShadow: token.boxShadowTertiary,
        width: "100%",
        height: "100%",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <h4 style={{ margin: 0, fontSize: "16px", color: token.colorText, fontWeight: 600 }}>
          Esquema de Rutas Nacional
        </h4>
        <span style={{ fontSize: "12px", color: token.colorTextDescription }}>
          Visualiza el trazado y pasa el cursor para destacar rutas
        </span>
      </div>

      <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <svg
          viewBox="0 0 340 400"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "380px",
            filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.12))",
          }}
        >
          {/* Mexico Landmass Outline Mockup (Stylized background) */}
          <path
            d="M20,60 L60,40 L100,50 L110,90 L90,140 L70,180 L90,230 L110,270 L140,290 L180,310 L240,320 L270,360 L290,370 L320,350 L330,360 L310,380 L290,390 L250,370 L210,350 L170,340 L130,350 L90,320 L60,260 L40,190 L30,120 L25,80 Z"
            fill={token.colorFillAlter}
            stroke={token.colorBorderSecondary}
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          {/* Railway Tracks (Phase color by default!) */}
          {routes.map((r) => {
            const start = nodes[r.from];
            const end = nodes[r.to];
            const isHovered = hoveredRoute === r.name;
            const theme = PHASE_THEMES[r.phase];
            
            return (
              <line
                key={`track-${r.name}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={theme.color}
                strokeWidth={isHovered ? 6 : 3.5}
                strokeLinecap="round"
                opacity={hasHoveredActive && !isHovered ? 0.2 : 0.85}
                style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
            );
          })}

          {/* Glowing Animated Active Tracks */}
          {routes.map((r) => {
            const start = nodes[r.from];
            const end = nodes[r.to];
            const isHovered = hoveredRoute === r.name;
            const theme = PHASE_THEMES[r.phase];
            if (!isHovered) return null;

            return (
              <line
                key={`glow-${r.name}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={theme.color}
                strokeWidth={9}
                strokeLinecap="round"
                opacity={0.4}
                style={{
                  filter: "blur(4px)",
                  transition: "all 0.3s ease",
                }}
              />
            );
          })}

          {/* Hitboxes for hovering route lines */}
          {routes.map((r) => {
            const start = nodes[r.from];
            const end = nodes[r.to];
            
            return (
              <line
                key={`hitbox-${r.name}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="transparent"
                strokeWidth={16}
                strokeLinecap="round"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => onHoverRoute(r.name)}
                onMouseLeave={() => onHoverRoute(null)}
              />
            );
          })}

          {/* Node Circles (Cities) */}
          {Object.entries(nodes).map(([name, node]) => {
            const isConnectedToHovered = hoveredRoute && routes.some(
              (r) => r.name === hoveredRoute && (r.from === name || r.to === name)
            );
            
            return (
              <g key={`node-${name}`} style={{ transition: "all 0.3s ease" }}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isConnectedToHovered ? 6.5 : 4}
                  fill={isConnectedToHovered ? token.colorPrimary : token.colorText}
                  stroke={token.colorBgContainer}
                  strokeWidth={2}
                  style={{ transition: "all 0.3s ease" }}
                />
                
                {/* City Label */}
                <text
                  x={node.x}
                  y={node.y - 8}
                  textAnchor="middle"
                  fill={token.colorText}
                  fontSize={isConnectedToHovered ? "9px" : "8px"}
                  fontWeight={isConnectedToHovered ? "bold" : "normal"}
                  style={{
                    transition: "all 0.3s ease",
                    pointerEvents: "none",
                    textShadow: `0 1px 2px ${token.colorBgContainer}`,
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Map Legend */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginTop: "16px",
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          paddingTop: "16px",
        }}
      >
        {Object.values(PHASE_THEMES).map((theme) => (
          <div key={`legend-${theme.id}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: theme.color,
                display: "inline-block",
                boxShadow: `0 0 6px ${theme.shadowColor}`,
              }}
            />
            <span style={{ fontSize: "12px", color: token.colorTextSecondary, fontWeight: 500 }}>
              {theme.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MexicoMap;

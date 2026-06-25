import React from "react";
import { theme as antdTheme } from "antd";
import { Proyecto } from "../types";
import { PhaseTheme } from "../constants";
import { RouteItem } from "./RouteItem";

const { useToken } = antdTheme;

interface PhaseColumnProps {
  phaseId: number;
  phaseProyecto: Proyecto | undefined;
  routes: Proyecto[];
  theme: PhaseTheme;
  hoveredRoute: string | null;
  onHoverRoute: (routeName: string | null) => void;
}

export const PhaseColumn: React.FC<PhaseColumnProps> = ({
  phaseId,
  phaseProyecto,
  routes,
  theme,
  hoveredRoute,
  onHoverRoute,
}) => {
  const { token } = useToken();
  const isPhase1 = phaseId === 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: token.colorBgContainer,
        borderRadius: "16px",
        padding: "20px",
        border: `1px solid ${token.colorBorderSecondary}`,
        boxShadow: token.boxShadowTertiary,
        transition: "all 0.3s ease",
      }}
    >
      {/* Header Row 1: Phase Circle & Name Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {/* Circle with Phase Number - Prevents oval shape with flexShrink: 0 */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: theme.color,
            color: "#FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            boxShadow: `0 0 10px ${theme.shadowColor}`,
            flexShrink: 0, // CRITICAL: prevents oval distortion!
          }}
        >
          {phaseId}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: theme.textColor,
              backgroundColor: theme.bgColor,
              padding: "2px 8px",
              borderRadius: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              width: "fit-content",
              marginBottom: "2px",
            }}
          >
            Fase
          </span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: token.colorText }}>
            {theme.name}
          </span>
        </div>
      </div>

      {/* Header Row 2: Metrics columns (Estimada / Adjudicada) - Separated from circle for full-width layout */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          padding: "12px",
          backgroundColor: token.colorFillAlter,
          borderRadius: "8px",
          alignItems: "flex-end",
        }}
      >
        {/* Estimada Col Header */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <span style={{ fontSize: "10px", color: token.colorTextDescription, display: "block", marginBottom: "4px", fontWeight: 500 }}>
            Estimada
          </span>
          <div
            style={{
              backgroundColor: "#201D1A",
              color: "#FFF",
              fontSize: "13px",
              fontWeight: "bold",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            {phaseProyecto?.LONGITUD !== null ? `${phaseProyecto?.LONGITUD} km` : "-"}
          </div>
        </div>

        {/* Adjudicada Columns for Phase 1 */}
        {isPhase1 && (
          <>
            {/* Adjudicada Obra */}
            <div style={{ flex: 1, textAlign: "center" }}>
              <span style={{ fontSize: "9px", color: token.colorTextDescription, display: "block", marginBottom: "4px", lineHeight: 1.1, fontWeight: 500 }}>
                Adjudicada (Obra)
              </span>
              <div
                style={{
                  border: `1px dashed ${token.colorBorder}`,
                  backgroundColor: "rgba(0,0,0,0.03)",
                  color: token.colorTextDescription,
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "3.5px 6px",
                  borderRadius: "4px",
                }}
              >
                -
              </div>
            </div>

            {/* Adjudicada Supervisión */}
            <div style={{ flex: 1, textAlign: "center" }}>
              <span style={{ fontSize: "9px", color: token.colorTextDescription, display: "block", marginBottom: "4px", lineHeight: 1.1, fontWeight: 500 }}>
                Adjudicada (Sup.)
              </span>
              <div
                style={{
                  border: `1px dashed ${token.colorBorder}`,
                  backgroundColor: "rgba(0,0,0,0.03)",
                  color: token.colorTextDescription,
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "3.5px 6px",
                  borderRadius: "4px",
                }}
              >
                -
              </div>
            </div>
          </>
        )}
      </div>

      {/* Routes List */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {routes.map((route) => (
          <RouteItem
            key={route.ID}
            route={route}
            theme={theme}
            isHovered={hoveredRoute === route.NOMBRE}
            onHover={onHoverRoute}
            showAdjudicadoColumns={isPhase1}
          />
        ))}
      </div>
    </div>
  );
};
export default PhaseColumn;

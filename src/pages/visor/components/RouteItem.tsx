import React from "react";
import { theme as antdTheme } from "antd";
import { Proyecto } from "../types";
import { PhaseTheme } from "../constants";

const { useToken } = antdTheme;

interface RouteItemProps {
  route: Proyecto;
  theme: PhaseTheme;
  isHovered: boolean;
  onHover: (routeName: string | null) => void;
  showAdjudicadoColumns: boolean;
}

export const RouteItem: React.FC<RouteItemProps> = ({
  route,
  theme,
  isHovered,
  onHover,
  showAdjudicadoColumns,
}) => {
  const { token } = useToken();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "12px 14px",
        borderRadius: "8px",
        backgroundColor: isHovered ? theme.bgColor : token.colorFillAlter,
        border: `1px solid ${isHovered ? theme.color : token.colorBorderSecondary}`,
        boxShadow: isHovered ? `0 4px 12px ${theme.shadowColor}` : "none",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        marginBottom: "10px",
      }}
      onMouseEnter={() => onHover(route.NOMBRE)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Row 1: Full-width Route Name */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: isHovered ? theme.textColor : token.colorText,
          lineHeight: 1.4,
          transition: "color 0.25s ease",
          wordBreak: "break-word",
        }}
      >
        {route.NOMBRE}
      </div>

      {/* Row 2: Metrics List */}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
        {/* Estimada Length Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px", color: isHovered ? theme.textColor : token.colorTextDescription, fontWeight: 600, textTransform: "uppercase" }}>
            Est:
          </span>
          <span
            style={{
              backgroundColor: isHovered ? theme.color : "#201D1A",
              color: "#FFF",
              fontSize: "11px",
              fontWeight: "bold",
              padding: "2px 8px",
              borderRadius: "4px",
              minWidth: "48px",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
              transition: "background-color 0.25s ease",
            }}
          >
            {route.LONGITUD !== null ? `${route.LONGITUD} km` : "-"}
          </span>
        </div>

        {/* Adjudicado metrics */}
        {showAdjudicadoColumns && (
          <>
            {/* Adjudicada Obra */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "10px", color: isHovered ? theme.textColor : token.colorTextDescription, fontWeight: 600, textTransform: "uppercase" }}>
                Obra:
              </span>
              <span
                style={{
                  border: isHovered ? `1px dashed ${theme.textColor}` : `1px dashed ${token.colorBorder}`,
                  backgroundColor: "rgba(0,0,0,0.03)",
                  color: isHovered ? theme.textColor : token.colorTextDescription,
                  fontSize: "11px",
                  fontWeight: "500",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  opacity: 0.7,
                }}
              >
                -
              </span>
            </div>

            {/* Adjudicada Supervisión */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "10px", color: isHovered ? theme.textColor : token.colorTextDescription, fontWeight: 600, textTransform: "uppercase" }}>
                Sup:
              </span>
              <span
                style={{
                  border: isHovered ? `1px dashed ${theme.textColor}` : `1px dashed ${token.colorBorder}`,
                  backgroundColor: "rgba(0,0,0,0.03)",
                  color: isHovered ? theme.textColor : token.colorTextDescription,
                  fontSize: "11px",
                  fontWeight: "500",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  opacity: 0.7,
                }}
              >
                -
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default RouteItem;

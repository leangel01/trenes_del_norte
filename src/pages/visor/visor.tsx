import React, { useState, useContext } from "react";
import { useList } from "@refinedev/core";
import { theme as antdTheme, Row, Col, Card, Spin, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ColorModeContext } from "../../contexts/color-mode";

import { Proyecto } from "./types";
import { FALLBACK_PROJECTS, PHASE_THEMES } from "./constants";
import { MexicoMap } from "./components/MexicoMap";
import { PhaseColumn } from "./components/PhaseColumn";

export const VisorPage: React.FC = () => {
  const { useToken } = antdTheme;
  const { token } = useToken();
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";

  // 1. Fetch data from Supabase proyectos table
  const { query } = useList<Proyecto>({
    resource: "proyectos",
    pagination: { mode: "off" },
  });
  const data = query.data;
  const isLoading = query.isLoading;

  // Hover state shared between list and map
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  // Determine if database returned valid projects, else use fallback mock data
  const projects = data?.data && data.data.length > 0 ? data.data : FALLBACK_PROJECTS;

  // Filter phases and routes
  const phases = projects.filter((p: Proyecto) => p.TIPO === "FASE").sort((a: Proyecto, b: Proyecto) => a.FASE_ID - b.FASE_ID);
  
  const getRoutesForPhase = (phaseId: number) => {
    return projects.filter((p: Proyecto) => p.TIPO === "RUTA" && p.FASE_ID === phaseId);
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Space direction="vertical" align="center">
          <Spin size="large" />
          <span style={{ color: "var(--ant-color-text-secondary)" }}>Cargando datos del visor...</span>
        </Space>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", minHeight: "100%" }}>
      {/* Premium Institutional Banner Header */}
      <div
        style={{
          background: isDark
            ? "linear-gradient(135deg, #1C1917 0%, #0C0A09 100%)"
            : "linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)",
          borderRadius: "16px",
          padding: "24px 32px",
          marginBottom: "24px",
          boxShadow: token.boxShadowSecondary,
          border: `1px solid ${token.colorBorderSecondary}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: isDark
              ? "radial-gradient(circle, rgba(131, 25, 62, 0.1) 0%, transparent 60%)"
              : "radial-gradient(circle, rgba(131, 25, 62, 0.05) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: isDark ? "#FFF" : token.colorTextHeading,
            letterSpacing: "1px",
            fontFamily: "Georgia, serif",
            textTransform: "uppercase",
            marginBottom: "8px",
            zIndex: 1,
          }}
        >
          "Trenes del norte"
        </span>

        {/* Central Black Pill Title */}
        <div
          style={{
            backgroundColor: isDark ? "#201D1A" : token.colorFillSecondary,
            border: `1px solid ${token.colorBorder}`,
            padding: "8px 24px",
            borderRadius: "30px",
            display: "inline-flex",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 1,
          }}
        >
          <span
            style={{
              color: isDark ? "#FFF" : token.colorText,
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "0.5px",
            }}
          >
            Longitud estimada/adjudicada (Km)
          </span>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Side: Summary Card and Interactive SVG Map */}
        <Col xs={24} lg={8} xl={7}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
            
            {/* Total Length Card */}
            <Card
              bordered={false}
              style={{
                background: token.colorBgContainer,
                border: `1px solid ${token.colorBorderSecondary}`,
                boxShadow: token.boxShadowTertiary,
                borderRadius: "16px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
                <span style={{ fontSize: "12px", color: token.colorTextDescription, fontWeight: 550, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  Longitud del proyecto
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: token.colorText,
                    fontFamily: token.fontFamily,
                    background: `linear-gradient(45deg, ${token.colorText} 30%, ${token.colorPrimary} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  3,375.54 km
                </span>
              </div>
            </Card>

            {/* Interactive SVG Railway Map */}
            <div style={{ flex: 1 }}>
              <MexicoMap
                hoveredRoute={hoveredRoute}
                onHoverRoute={setHoveredRoute}
              />
            </div>
            
            {/* Information Alert */}
            <Card
              size="small"
              bordered={false}
              style={{
                backgroundColor: isDark ? "rgba(250, 173, 20, 0.05)" : "rgba(250, 173, 20, 0.08)",
                border: `1px solid ${isDark ? "rgba(250, 173, 20, 0.15)" : "rgba(250, 173, 20, 0.2)"}`,
                borderRadius: "12px",
              }}
            >
              <Space align="start">
                <InfoCircleOutlined style={{ color: "#faad14", marginTop: "3px" }} />
                <span style={{ fontSize: "11.5px", color: token.colorTextSecondary }}>
                  Las columnas de <strong>Adjudicado (Obra y Supervisión)</strong> se encuentran vacías provisionalmente debido a que dicha información no ha sido cargada en la base de datos de Supabase.
                </span>
              </Space>
            </Card>
          </div>
        </Col>

        {/* Right Side: Horizontal Scrollable Columns Grid for Phases */}
        <Col xs={24} lg={16} xl={17}>
          <div
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              paddingBottom: "16px",
              height: "100%",
            }}
          >
            {phases.map((phase: Proyecto) => (
              <div
                key={`phase-col-${phase.FASE_ID}`}
                style={{
                  flex: "1 0 280px",
                  minWidth: "260px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <PhaseColumn
                  phaseId={phase.FASE_ID}
                  phaseProyecto={phase}
                  routes={getRoutesForPhase(phase.FASE_ID)}
                  theme={PHASE_THEMES[phase.FASE_ID]}
                  hoveredRoute={hoveredRoute}
                  onHoverRoute={setHoveredRoute}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default VisorPage;

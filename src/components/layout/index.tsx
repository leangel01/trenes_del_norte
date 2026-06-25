import React, { useContext } from "react";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { Layout as AntdLayout, Menu, Avatar, Space, Switch, theme, Typography, Button } from "antd";
import { Link, useLocation } from "react-router";
import { DashboardOutlined, BookOutlined, FolderOpenOutlined, LogoutOutlined } from "@ant-design/icons";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const CustomLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { token } = useToken();
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<IUser>();
  const { mutate: logout } = useLogout();
  const location = useLocation();

  // Find active key based on current pathname
  const getActiveKey = () => {
    const path = location.pathname;
    if (path.startsWith("/visor")) return "visor";
    if (path.startsWith("/blog-posts")) return "blog-posts";
    if (path.startsWith("/categories")) return "categories";
    return "visor"; // default fallback
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  };

  const logoStyles: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "Georgia, serif",
    color: token.colorTextHeading,
    textDecoration: "none",
    marginRight: "24px",
    letterSpacing: "0.5px",
    flexShrink: 0,
  };

  const menuItems = [
    {
      key: "visor",
      icon: <DashboardOutlined />,
      label: <Link to="/visor">Visor</Link>,
    },
    {
      key: "blog-posts",
      icon: <BookOutlined />,
      label: <Link to="/blog-posts">Blog Posts</Link>,
    },
    {
      key: "categories",
      icon: <FolderOpenOutlined />,
      label: <Link to="/categories">Categories</Link>,
    },
  ];

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      {/* Top Horizontal Navbar */}
      <AntdLayout.Header style={headerStyles}>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          {/* Logo / Branding */}
          <Link to="/visor" style={logoStyles}>
            Trenes del Norte
          </Link>

          {/* Horizontal Navigation Menu */}
          <Menu
            mode="horizontal"
            selectedKeys={[getActiveKey()]}
            items={menuItems}
            style={{
              borderBottom: "none",
              backgroundColor: "transparent",
              lineHeight: "64px",
              flex: 1,
              maxWidth: "500px",
            }}
          />
        </div>

        {/* Right Section: Theme Toggle, User Profile & Logout */}
        <Space size="large" style={{ flexShrink: 0 }}>
          {/* Theme switch */}
          <Switch
            checkedChildren="🌛"
            unCheckedChildren="🔆"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            checked={mode === "dark"}
          />

          {/* User profile */}
          {user && (
            <Space style={{ display: "flex", alignItems: "center" }}>
              {user.name && <Text strong style={{ color: token.colorText }}>{user.name}</Text>}
              {user.avatar ? (
                <Avatar src={user.avatar} alt={user.name} />
              ) : (
                <Avatar style={{ backgroundColor: token.colorPrimary }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </Avatar>
              )}
            </Space>
          )}

          {/* Logout Button */}
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => logout()}
            style={{ color: token.colorTextSecondary }}
          >
            Salir
          </Button>
        </Space>
      </AntdLayout.Header>

      {/* Main Content Area */}
      <AntdLayout.Content style={{ padding: "24px", minHeight: "calc(100vh - 64px)" }}>
        {children}
      </AntdLayout.Content>
    </AntdLayout>
  );
};
export default CustomLayout;

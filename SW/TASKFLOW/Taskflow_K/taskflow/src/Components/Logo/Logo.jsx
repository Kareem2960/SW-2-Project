import React from "react";
import { Typography } from "antd";
import { RocketFilled } from "@ant-design/icons";
import { primaryColor } from "../../Constants/Colors";

const { Text } = Typography;

const Logo = ({ collapsed }) => {
  return (
    <div
      style={{
        padding: collapsed ? "16px 0" : "20px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        transition: "all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)",
        overflow: "hidden",
        borderBottom: collapsed
          ? "none"
          : `1px solid rgba(255, 255, 255, 0.05)`,
        marginBottom: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Animated Icon Wrapper */}
        <div
          style={{
            minWidth: collapsed ? "40px" : "36px",
            height: collapsed ? "40px" : "36px",
            background: `linear-gradient(135deg, ${primaryColor} 0%, #434343 100%)`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 16px ${primaryColor}40`,
            transition: "all 0.3s ease",
            transform: collapsed ? "scale(0.9)" : "scale(1)",
          }}
        >
          <RocketFilled
            style={{
              fontSize: collapsed ? "20px" : "18px",
              color: "#fff",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          />
        </div>

        {/* Brand Text with Reveal Animation */}
        <div
          style={{
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : "auto",
            transform: collapsed ? "translateX(-10px)" : "translateX(0)",
            transition: "all 0.3s ease-in-out",
            whiteSpace: "nowrap",
            pointerEvents: collapsed ? "none" : "auto",
          }}
        >
          <Text
            style={{
              fontSize: "22px",
              fontWeight: "900",
              color: "#fff",
              letterSpacing: "-0.5px",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
            }}
          >
            Nova
            <span
              style={{
                background: `linear-gradient(to right, ${primaryColor}, #22d3ee)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginLeft: "2px",
              }}
            >
              Pulse
            </span>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Logo;

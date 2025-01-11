import { Badge } from "@radix-ui/themes";
import { FC } from "react";

export type Status = "success" | "error" | "warning";

interface StatusChipProps {
  type: Status;
  label: string;
}

const getStatusColor = (type: Status) => {
  switch (type) {
    case "error":
      return "#B42318";

    case "success":
      return "#047647";

    case "warning":
      return "yellow";
  }
};

const getBorderColor = (type: Status) => {
  switch (type) {
    case "error":
      return "#fecdca";

    case "success":
      return "#acefc6";

    case "warning":
      return "yellow";
  }
};

const getDotBgColor = (type: Status) => {
  switch (type) {
    case "error":
      return "#f14437";

    case "success":
      return "#19b26b";

    case "warning":
      return "yellow";
  }
};

const getDotStyle = (type: Status) => {
  return {
    height: "6px",
    width: "6px",
    backgroundColor: getDotBgColor(type),
    borderRadius: "50%",
    display: "inline-block",
  };
};

const getBackgroundColor = (type: Status) => {
  switch (type) {
    case "error":
      return "#fef3f2";

    case "success":
      return "#ecfef3";

    case "warning":
      return "yellow";
  }
};

export const StatusChip: FC<StatusChipProps> = ({ label, type }) => {
  return (
    <Badge
      style={{
        border: `1px solid ${getBorderColor(type)}`,
        fontSize: "12px",
        color: getStatusColor(type),
        backgroundColor: getBackgroundColor(type),
        borderRadius: "6px",
      }}
    >
      <span style={getDotStyle(type)}></span>
      {label}
    </Badge>
  );
};

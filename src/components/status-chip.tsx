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
      return "tomato";

    case "success":
      return "green";

    case "warning":
      return "yellow";
  }
};

const getBorderColor = (type: Status) => {
  switch (type) {
    case "error":
      return "#FECDCA";

    case "success":
      return "#ABEFC6";

    case "warning":
      return "yellow";
  }
};

const getDotStyle = (type: Status) => {
  return {
    height: "6px",
    width: "6px",
    backgroundColor: getStatusColor(type),
    borderRadius: "50%",
    display: "inline-block",
  };
};

export const StatusChip: FC<StatusChipProps> = ({ label, type }) => {
  return (
    <Badge
      style={{ border: `1px solid ${getBorderColor(type)}` }}
      color={getStatusColor(type)}
    >
      <span style={getDotStyle(type)}></span>
      {label}
    </Badge>
  );
};

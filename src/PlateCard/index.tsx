import React from "react";
import { styled, Theme } from "@mui/system";
import { Stack, StackProps, IconButton, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  closable?: boolean;
  view: "create" | "edit" | "resume";
  sx?: any;
}

const CustomCard = styled(Stack, { skipSx: false })<Props>(
  ({ theme, view, sx }: { theme: Theme } & Props) => ({
    color: theme.palette.text.primary,
    flexDirection: view === "resume" ? "row" : "column",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: ".7rem",
    padding: "1.5rem",
    ...sx,
  })
);

const PlateCard = (props: Props & Omit<StackProps, keyof Props>) => {
  const { children, closable, view = "create", sx, ...other } = props;
  const [localView, setLocalView] = React.useState(view);

  //MENU
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CustomCard view={localView} {...other} sx={sx}>
      {children}
      {closable && localView === "create" ? (
        <div style={{ width: "fit-content", alignSelf: "end" }}>
          <IconButton
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      ) : (
        <IconButton
          onClick={() => setLocalView("resume")}
          sx={{
            width: "fit-content",
            position: "absolute",
            top: "15px",
            right: "15px",
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </CustomCard>
  );
};

export default PlateCard;

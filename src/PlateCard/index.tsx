import React, { useEffect } from "react";
import { styled, Theme } from "@mui/system";
import { Stack, StackProps, IconButton, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  closable?: boolean;
  view: "create" | "edit" | "resume";
  onDelete: Function;
  sx?: any;
}

const CustomCard = styled(Stack, { skipSx: false })<Props>(
  ({ theme, view, sx }: { theme: Theme } & Props) => ({
    color: theme.palette.text.primary,
    flexDirection: view === "resume" ? "row" : "column",
    justifyContent: "space-between",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: ".7rem",
    padding: "1.5rem",
    ...sx,
  })
);

const PlateCard = (props: Props & Omit<StackProps, keyof Props>) => {
  const { children, closable, view, onDelete, sx, ...other } = props;
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
  const onChange = (view: Props["view"]) => {
    setLocalView(view);
  };

  useEffect(() => {
    setLocalView(view);
  }, [view]);

  return (
    <CustomCard view={localView} onDelete={onDelete} {...other} sx={sx}>
      <Stack flexDirection={view === "resume" ? "row" : "column"}>
        {children}
      </Stack>
      {localView === "resume" && (
        <div style={{ width: "fit-content", alignSelf: "end" }}>
          <IconButton
            data-testid="open-menu-button"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                onChange("edit");
                handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={() => onDelete()}>Delete</MenuItem>
          </Menu>
        </div>
      )}
      {closable && localView !== "resume" && (
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

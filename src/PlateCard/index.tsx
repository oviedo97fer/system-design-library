import React from "react";
import { styled, Theme } from "@mui/system";
import { Stack, StackProps, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  closable?: boolean;
  showOptions?: boolean;
  options?: Array<Options>;
  sx?: any;
}
interface Options {
  label: string;
  onClick: Function;
}

const CustomCard = styled(Stack, { skipSx: false })<Props>(
  ({ theme, showOptions, sx }: { theme: Theme } & Props) => ({
    color: theme.palette.text.primary,
    flexDirection: showOptions ? "row" : "column",
    justifyContent: "space-between",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: ".7rem",
    padding: "1.5rem",
    ...sx,
  })
);

const PlateCard = (props: Props & Omit<StackProps, keyof Props>) => {
  const { children, closable, showOptions, options, sx, ...other } = props;

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
    <CustomCard showOptions={showOptions} {...other} sx={sx}>
      <Stack flexDirection={showOptions ? "row" : "column"}>{children}</Stack>
      {showOptions && (
        <div style={{ width: "fit-content", alignSelf: "end" }}>
          <IconButton
            data-testid="open-menu-button"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {options?.map(({ label, onClick }) => (
              <MenuItem
                onClick={() => {
                  onClick();
                  handleClose();
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </CustomCard>
  );
};

export default PlateCard;

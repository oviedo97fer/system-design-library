import React from "react";

import MarkdownPreview from "@uiw/react-markdown-preview";

interface MarkdownRenderProps {
    text: string;
    onCloseModal?: () => void;
    onConfirmModal?: () => void;
    isCentered?: boolean;
    handleRadioChange?: () => void;
    checkboxChecked?: boolean;
}

const MarkdownRender: React.FC<MarkdownRenderProps> = ({
    text
    /* onCloseModal = () => {},
    onConfirmModal = () => {},
    isCentered = false,
    handleRadioChange = () => {},
    checkboxChecked = false */
}) => {
    /*  const components: Components = {
        img: ({ node, ...props }) => <img {...props} alt={props.alt} />,
        a: ({ node, ...props }) => {
            const href = props.href ?? "";
            const isButton = href === "#";
            const isHintLink = href.includes("hint-");
            const isCloseButton = href.includes("close");
            // const hintKey = isHintLink ? href.slice(5) : "";
            const isSimpleLink = href.includes("link:");

            if (href === "checkbox") {
                return (
                    <FormControlLabel
                        control={<Checkbox checked={checkboxChecked} onChange={handleRadioChange} />}
                        label={props.children}
                    />
                );
            } else if (isHintLink) {
                return (
                    <Button
                        // onClick={() => openModal(hintKey)}
                        sx={{ color: "primary.main" }}
                    >
                        {props.children}
                    </Button>
                );
            } else if (isCloseButton) {
                return (
                    <Button variant="contained" onClick={onCloseModal} sx={{ mt: -3 }}>
                        {props.children}
                    </Button>
                );
            } else if (isSimpleLink) {
                return (
                    <Typography
                        href={href.slice(5)}
                        sx={{ color: "primary.main" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        component="a"
                    >
                        {props.children}
                    </Typography>
                );
            } else {
                return isButton ? (
                    <Button variant="contained" sx={{ mt: 5 }} onClick={isButton ? onConfirmModal : () => {}}>
                        props.children
                    </Button>
                ) : (
                    <Typography
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        component="a"
                        sx={{ color: "primary.main" }}
                    >
                        {props.children}
                    </Typography>
                );
            }
        },
        // blockquote: ({ node, ...props }) => (
        // 	<Grid container alignItems="center" style={{ paddingTop: 24 }}>
        // 		<Grid item>
        // 			<img style={{ borderRadius: 0 }} src="/images/icons/note-icon.svg" alt="Note Icon" />
        // 		</Grid>
        // 		<Grid item>
        // 			<Typography variant="subtitle1" style={{ paddingLeft: 8 }}>
        // 				{props.children}
        // 			</Typography>
        // 		</Grid>
        // 	</Grid>
        // ),
        h3: ({ node, ...props }) => <Typography variant="h3">{props.children}</Typography>,
        h4: ({ node, ...props }) => <Typography variant="h4">{props.children}</Typography>
    };
 */
    return (
        <MarkdownPreview
            source={text}
            style={{ padding: 16 }}
            /* components={components} */
        />
    );
};

export default MarkdownRender;

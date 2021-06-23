export const frontPageStyles = (theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(28, 0, 16),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    cardMedia: {
        flexBasis: "72px",
        marginTop: `${theme.spacing(4)}px !important`,
    },
    cardContent: {
        paddingTop: theme.spacing(4),
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        flexBasis: "75%",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});

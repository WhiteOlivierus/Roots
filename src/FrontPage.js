import * as MUI from "@material-ui/core";
import * as React from "react";

import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";

const Copyright = () => (
    <MUI.Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MUI.Link color="inherit" href="https://dutchskull.com/">
            Dutchskull
        </MUI.Link>{" "}
        {new Date().getFullYear()}
        {"."}
    </MUI.Typography>
);

const useStyles = MUI.makeStyles((theme) => ({
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
}));

const cards = [
    {
        heading: "Open-source",
        text:
            "Creative tools for everyone. That is why Roots is open source. Contribute code or features, so everyone can create their stories.",
        img: "/frontPageIcons/OpenSource.svg",
    },
    {
        heading: "Node-based story workflow",
        text:
            "Branched or a linear story, create immersive stories with Roots node-based workflow.",
        img: "/frontPageIcons/NodeWorkflow.svg",
    },
    {
        heading: "Simple user interface",
        text:
            "Roots has been made with simplicity in mind. Be up and running in minutes. Everybody should be able to use the tools to create.",
        img: "/frontPageIcons/SimpleUserInterface.svg",
    },
    {
        heading: "Accessible anywhere",
        text:
            "Access Roots anywhere! In the browser, as an app, and even when you are offline. Create anywhere.",
        img: "/frontPageIcons/Earth.svg",
    },
    {
        heading: "Simple scene editor",
        text:
            "Create your narrative by adding text, images, and music just like you would in any presentation software.",
        img: "/frontPageIcons/SimpleEditor.svg",
    },
    {
        heading: "Share easily",
        text:
            "No need to pay for hosting nor to know how all of that works. Export your game as an executable and share it with anyone.",
        img: "/frontPageIcons/Share.svg",
    },
];

const contributions = [
    {
        title: "Code",
        text:
            "Do you want to help and make Roots better by lending your development skills? Quickly go to GitHub and start talking about what you want to help with.",
        button: "Github",
        link: "https://github.com/WhiteOlivierus/Roots",
    },
    {
        title: "Bugs",
        text:
            "Oh no, Roots broke down when you were working on your story.Help us to make Roots more stable by reporting the bug, so you can go on with your project.",
        button: "Report bug",
        link: "https://github.com/WhiteOlivierus/Roots/issues",
    },
    {
        title: "Features",
        text:
            "Do you have a great idea to improve everyone's productivity or creativity? Leave a request for your feature on GitHub.",
        button: "Feature request",
        link: "https://github.com/WhiteOlivierus/Roots/issues",
    },
];

const FrontPage = () => {
    const classes = useStyles();
    const theme = MUI.useTheme();
    return (
        <>
            <MUI.CssBaseline />
            <main style={{ backgroundColor: theme.palette.primary.main }}>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <img
                            src="/compressed/logo_text_color.svg"
                            width={"100%"}
                            style={{
                                marginTop: 50,
                                marginBottom: 50,
                            }}
                            preload="true"
                        />
                        <MUI.Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            A 2D narrative engine right in the browser.
                        </MUI.Typography>
                        <div className={classes.heroButtons}>
                            <MUI.Grid container spacing={2} justify="center">
                                <MUI.Grid item>
                                    <MUI.Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            var getUrl = window.location;
                                            var baseUrl =
                                                getUrl.protocol +
                                                "//" +
                                                getUrl.host +
                                                "/" +
                                                "roots";
                                            window.open(baseUrl, "_blank");
                                        }}
                                    >
                                        Get started
                                    </MUI.Button>
                                </MUI.Grid>
                                <MUI.Grid item>
                                    <MUI.Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            window.open(
                                                "https://github.com/WhiteOlivierus/Roots",
                                                "_blank"
                                            );
                                        }}
                                    >
                                        Github
                                    </MUI.Button>
                                </MUI.Grid>
                            </MUI.Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <MUI.Grid container spacing={4}>
                        <MUI.Grid item xs={12}>
                            <MUI.Typography
                                gutterBottom
                                variant="h2"
                                style={{
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
                                Features
                            </MUI.Typography>
                        </MUI.Grid>
                        {cards.map((card) => (
                            <MUI.Grid item key={card.heading} xs={4}>
                                <MUI.Card
                                    className={classes.card}
                                    style={{
                                        flexDirection: "column",
                                    }}
                                >
                                    <MUI.CardMedia
                                        style={{
                                            backgroundSize: "contain",
                                            margin: theme.spacing(),
                                        }}
                                        className={classes.cardMedia}
                                        image={card.img}
                                        title="Image title"
                                    />
                                    <MUI.CardContent
                                        className={classes.cardContent}
                                    >
                                        <MUI.Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {card.heading}
                                        </MUI.Typography>
                                        <MUI.Typography>
                                            {card.text}
                                        </MUI.Typography>
                                    </MUI.CardContent>
                                </MUI.Card>
                            </MUI.Grid>
                        ))}
                        <MUI.Grid item xs={12}>
                            <MUI.Grid container spacing={4}>
                                <MUI.Grid item xs={12}>
                                    <MUI.Typography
                                        gutterBottom
                                        variant="h2"
                                        style={{
                                            color:
                                                theme.palette.primary
                                                    .contrastText,
                                        }}
                                    >
                                        Contribute
                                    </MUI.Typography>
                                </MUI.Grid>
                                {contributions.map((contribution, i) => (
                                    <Contribution
                                        key={`contribution_${i}`}
                                        theme={theme}
                                        contribution={contribution}
                                    />
                                ))}
                            </MUI.Grid>
                        </MUI.Grid>
                    </MUI.Grid>
                </Container>
            </main>
            <footer className={classes.footer}>
                <MUI.Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Roots - 2D narrative game engine on the web
                </MUI.Typography>
                <Copyright />
            </footer>
        </>
    );
};

FrontPage.propTypes = {};

export default FrontPage;

const Contribution = ({ theme, contribution }) => (
    <MUI.Grid item xs={4} style={{ display: "flex", flexDirection: "column" }}>
        <MUI.Typography
            style={{
                color: theme.palette.primary.contrastText,
            }}
            gutterBottom
            variant="h3"
        >
            {contribution.title}
        </MUI.Typography>
        <MUI.Typography
            style={{
                color: theme.palette.primary.contrastText,
                flexGrow: 1,
            }}
            gutterBottom
        >
            {contribution.text}
        </MUI.Typography>
        <MUI.Button
            style={{ margin: theme.spacing(4) }}
            variant="contained"
            color="secondary"
            onClick={() => {
                window.open(contribution.link, "_blank");
            }}
        >
            {contribution.button}
        </MUI.Button>
    </MUI.Grid>
);

Contribution.propTypes = {
    theme: PropTypes.object,
    contribution: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        button: PropTypes.string,
        link: PropTypes.string,
    }),
};

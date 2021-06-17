import PropTypes from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router";

const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://dutchskull.com/">
            Dutchskull
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
    </Typography>
);

const useStyles = makeStyles((theme) => ({
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

const FrontPage = ({ history }) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <CssBaseline />
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
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            A 2D narrative engine right in the browser.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => history.push("/roots")}
                                    >
                                        Get started
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
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
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography
                                gutterBottom
                                variant="h2"
                                style={{
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
                                Features
                            </Typography>
                        </Grid>
                        {cards.map((card) => (
                            <Grid item key={card.heading} xs={4}>
                                <Card
                                    className={classes.card}
                                    style={{
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardMedia
                                        style={{
                                            backgroundSize: "contain",
                                            margin: theme.spacing(),
                                        }}
                                        className={classes.cardMedia}
                                        image={card.img}
                                        title="Image title"
                                    />
                                    <CardContent
                                        className={classes.cardContent}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {card.heading}
                                        </Typography>
                                        <Typography>{card.text}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography
                                        gutterBottom
                                        variant="h2"
                                        style={{
                                            color:
                                                theme.palette.primary
                                                    .contrastText,
                                        }}
                                    >
                                        Contribute
                                    </Typography>
                                </Grid>
                                {contributions.map((contribution, i) => (
                                    <Contribution
                                        key={`contribution_${i}`}
                                        theme={theme}
                                        contribution={contribution}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <footer className={classes.footer}>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Roots - 2D narrative game engine on the web
                </Typography>
                <Copyright />
            </footer>
        </>
    );
};

FrontPage.propTypes = {
    classes: PropTypes.shape({
        card: PropTypes.any,
        cardContent: PropTypes.any,
        cardGrid: PropTypes.any,
        cardMedia: PropTypes.any,
        footer: PropTypes.any,
        heroButtons: PropTypes.any,
        heroContent: PropTypes.any,
    }),
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default withRouter(FrontPage);

const Contribution = ({ theme, contribution }) => (
    <Grid item xs={4} style={{ display: "flex", flexDirection: "column" }}>
        <Typography
            style={{
                color: theme.palette.primary.contrastText,
            }}
            gutterBottom
            variant="h3"
        >
            {contribution.title}
        </Typography>
        <Typography
            style={{
                color: theme.palette.primary.contrastText,
                flexGrow: 1,
            }}
            gutterBottom
        >
            {contribution.text}
        </Typography>
        <Button
            style={{ margin: theme.spacing(4) }}
            variant="contained"
            color="secondary"
            onClick={() => {
                window.open(contribution.link, "_blank");
            }}
        >
            {contribution.button}
        </Button>
    </Grid>
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

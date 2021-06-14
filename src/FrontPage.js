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
        flexBasis: "25%",
        paddingTop: "56.25%",
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
        heading: "Node based workflow",
        text: "Create branched stories with the node based workflow.",
        img: "https://source.unsplash.com/random",
    },
    {
        heading: "Simple user interface",
        text:
            "This app has been build up with useability in mind. If you have made a presentation or used a computer you can build a story with this tool.",
        img: "https://source.unsplash.com/random",
        offsetX: -25,
    },
    {
        heading: "Web app",
        text: "Take Roots everywhere you go, even if you don't have internet.",
        img: "https://source.unsplash.com/random",
        offsetX: 30,
    },
    {
        heading: "Audio",
        text: "Wow audio in the app",
        img: "https://source.unsplash.com/random",
        offsetX: 30,
    },
    {
        heading: "Simple scene editor",
        text: "Just like making a presentation",
        img: "https://source.unsplash.com/random",
        offsetX: 30,
    },
    {
        heading: "Publish executable",
        text:
            "No need to understand hosting or too pay for publishing. You always can export your project to a executable that you can share with who ever and where ever you want.",
        img: "https://source.unsplash.com/random",
        offsetX: 50,
    },
];

const FrontPage = ({ history }) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <React.Fragment>
            <CssBaseline />
            <main style={{ backgroundColor: theme.palette.primary.main }}>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <img
                            src="/Compressed/logo_text_color.svg"
                            width={"100%"}
                            style={{
                                marginTop: 50,
                                marginBottom: 50,
                            }}
                            preload
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
                        {cards.map((card) => {
                            return (
                                <Grid item key={card} xs={4}>
                                    <Card
                                        className={classes.card}
                                        style={{
                                            flexDirection: "column-reverse",
                                        }}
                                    >
                                        <CardMedia
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
                            );
                        })}
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
                                <Grid item xs={6}>
                                    <Typography
                                        style={{
                                            color:
                                                theme.palette.primary
                                                    .contrastText,
                                        }}
                                        gutterBottom
                                    >
                                        If you have the know how you can
                                        contribute by going to the github page
                                        and look at the project.
                                    </Typography>
                                    <Button
                                        style={{ margin: theme.spacing(4) }}
                                        variant="outlined"
                                        color="secondary"
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
                                <Grid item xs={6}>
                                    <Typography
                                        style={{
                                            color:
                                                theme.palette.primary
                                                    .contrastText,
                                        }}
                                        gutterBottom
                                    >
                                        Even if you don&apos;t know how to
                                        program you can go to the feature
                                        request page and share your ideas for
                                        features.
                                    </Typography>

                                    <Button
                                        style={{ margin: theme.spacing(4) }}
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => {
                                            window.open(
                                                "https://github.com/WhiteOlivierus/Roots/issues",
                                                "_blank"
                                            );
                                        }}
                                    >
                                        Feature request
                                    </Button>
                                </Grid>
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
        </React.Fragment>
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

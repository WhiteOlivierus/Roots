import PropTypes from "prop-types";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
        padding: theme.spacing(8, 0, 6),
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
        flexDirection: "column",
    },
    cardMedia: {
        paddingTop: "56.25%",
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const FrontPage = ({ classes, history }) => (
    <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
                <img src="./Compressed/logo_text_white.svg" height={36} />
            </Toolbar>
        </AppBar>
        <main>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        Roots
                    </Typography>
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
                        </Grid>
                    </div>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        Heading
                                    </Typography>
                                    <Typography>
                                        This is a media card. You can use this
                                        section to describe the content.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        View
                                    </Button>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
            >
                Something here to give the footer a purpose!
            </Typography>
            <Copyright />
        </footer>
    </React.Fragment>
);

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

export default withStyles(useStyles)(withRouter(FrontPage));

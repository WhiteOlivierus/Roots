import * as MUI from "@material-ui/core";
import * as React from "react";

import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Contribution from "./Contribution";
import { frontPageStyles } from "./frontPageStyles";
import { cards, contributions } from "./cards";
import { Copyright } from "./Copyright";

const FrontPage = ({ theme, classes }) => (
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
                                            "https://github.com/Dutchskull/Roots",
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
                                    <MUI.Typography>{card.text}</MUI.Typography>
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
                                            theme.palette.primary.contrastText,
                                    }}
                                >
                                    Contribute
                                </MUI.Typography>
                            </MUI.Grid>
                            {contributions.map((contribution, i) => (
                                <Contribution
                                    key={`contribution_${i}`}
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

FrontPage.propTypes = {
    theme: PropTypes.object,
    classes: PropTypes.object,
};

export default MUI.withStyles(frontPageStyles)(MUI.withTheme(FrontPage));

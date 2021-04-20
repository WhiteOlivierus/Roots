import * as React from "react";
import { Container, Header, Content, Item } from "./Container";

const Test = () => {
    return (
        <Container>
            <Header />
            <Content>
                <Item size={"100px"} noShrink color={getRandomColor}>
                    test
                </Item>
                <Item color={getRandomColor} />
                <Item size={"250px"} noShrink color={getRandomColor}>
                    another test
                </Item>
            </Content>
        </Container>
    );
};

Test.displayName = "Test";

Test.propTypes = {};

Test.defaultProps = {};

export default Test;

export function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

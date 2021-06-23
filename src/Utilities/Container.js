import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
    height: 100%;
`;
export const Header = styled.div`
    flex: 1 0 auto;
`;
export const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 1 100%;
`;
const basis = ({ auto }) => (auto ? "auto" : "100%");
const shrink = ({ noShrink }) => (noShrink ? 0 : 1);
export const Item = styled.div`
    flex: 1 ${shrink} ${basis};
`;

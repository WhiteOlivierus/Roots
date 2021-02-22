export function MenuItem(props: any) {
    return (
        <li style={{ listStyle: "none" }}>
            <button style={{ width: "100%" }} onClick={(e) => props.action(e)}>
                {props.children}
            </button>
        </li>
    );
}

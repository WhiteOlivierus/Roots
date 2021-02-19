export function MenuItem(props: any) {
    return (
        <li style={{ listStyle: "none" }}>
            <button style={{ width: "100%" }} onClick={props.action}>
                {props.children}
            </button>
        </li>
    );
}

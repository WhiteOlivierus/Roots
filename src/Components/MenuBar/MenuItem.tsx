export function MenuItem(props: any) {
    const action = props.action ? (e) => props.action(e) : (e) => {};
    return (
        <li style={{ listStyle: "none" }}>
            <button style={{ width: "100%" }} onClick={action}>
                {props.children}
            </button>
        </li>
    );
}

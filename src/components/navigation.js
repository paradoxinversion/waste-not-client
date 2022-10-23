export const NavigationBar = (props) => {
    return (
        <div>
            <button onClick={()=>{
                props.onTabSelect("inventory")
            }}>Inventory</button>
            <button onClick={()=>{
                props.onTabSelect("authentication")
            }}>Auth</button>
        </div>
    );
}
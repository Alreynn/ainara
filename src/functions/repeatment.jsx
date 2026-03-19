const repeatment = (item, amount) => {
    let components = [];
    
    for (let i = 0; i < amount; i++) {
        components.push(<>{item}</>)
    }
    return components;
}
export default repeatment
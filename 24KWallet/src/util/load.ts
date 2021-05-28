const onLoad = () => {
    return new Promise((resolve: (value?: any) => void) => {
        if (document.readyState === 'complete') return resolve();
        window.onload = resolve;
    } );
}
export default onLoad;

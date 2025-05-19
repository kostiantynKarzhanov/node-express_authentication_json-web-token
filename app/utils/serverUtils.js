const stopServer = (message) => {
    console.error(`${message}. Stopping the server...`);
    process.exit(1);
};

export {
    stopServer
};
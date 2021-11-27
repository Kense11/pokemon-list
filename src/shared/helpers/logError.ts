export const logError = (error: Error, from?: string, ...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.error(from ? `${from}: error` : error, ...args);

    return error;
};

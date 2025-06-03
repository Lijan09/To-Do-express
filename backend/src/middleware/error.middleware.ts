 class GlobalError extends Error {
    constructor(message: string, error: any) {
        super(message);
        this.name = 'GlobalError';
        this.stack = error.stack;
    }
 }
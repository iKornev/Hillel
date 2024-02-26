const NotFoundStatus = 404;

class NotFoundException extends Error {

    status
    message
    constructor(status, message) {
        super(message);
        this.status = NotFoundStatus;
        this.message = message ? message: 'Not found';
    }
}



export { NotFoundException }
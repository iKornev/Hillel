const CreatePost = require('../../controller/postController')

describe('main controller', () => {
    describe('main controller', () => {
        it('mainController should not throw error on success', async () => {

            const req = {
                body: {
                    post: {
                        data: {}
                    }
                },
            };

            const expectedResult = {
                owner: "some id",
            };


            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await CreatePost(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({ postData: expectedResult });
        });
    });


    it('mainController should respond with 500 status on failure', async () => {
        const req = {
            body: {

            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await CreatePost(req, res);

        expect(res.status).toBeCalledWith(500);
    });
});

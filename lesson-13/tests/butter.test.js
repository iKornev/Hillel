const fetchData = require('./butter')

describe('must check butter', () => {
    it('данные являются арахисовым маслом', async () => {
        await expect(fetchData(true)).resolves.toBe('арахисовое масло');
    });

    it('fetch вернёт ошибку', async () => {
        await expect(fetchData(false)).rejects.toMatch('error');
    });
})
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adds 3 + 2  not  equal 3', () => {
    expect(sum(3, 2)).not.toBe(3);
});


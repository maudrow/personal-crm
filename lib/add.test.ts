import add from './add'

describe('Adds two numbers', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})

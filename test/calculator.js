import { expect } from 'chai';
import { add, sub, mul, div } from '../calculator.js';

describe('Calculator Tests', () => {
  // Test for addition
  it('add(5, 2) should return 7 (PASS)', () => {
    expect(add(5, 2)).to.equal(7);
  });
  it('add(5, 2) should NOT return 8 (FAIL)', () => {
    expect(add(5, 2)).to.not.equal(8);
  });

  // Test for subtraction
  it('sub(5, 2) should return 3 (PASS)', () => {
    expect(sub(5, 2)).to.equal(3);
  });
  it('sub(5, 2) should NOT return 5 (FAIL)', () => {
    expect(sub(5, 2)).to.not.equal(5);
  });

  // Test for multiplication
  it('mul(5, 2) should return 10 (PASS)', () => {
    expect(mul(5, 2)).to.equal(10);
  });
  it('mul(5, 2) should NOT return 12 (FAIL)', () => {
    expect(mul(5, 2)).to.not.equal(12);
  });

  // Test for division
  it('div(10, 2) should return 5 (PASS)', () => {
    expect(div(10, 2)).to.equal(5);
  });
  it('div(10, 2) should NOT return 2 (FAIL)', () => {
    expect(div(10, 2)).to.not.equal(2);
  });

  // Test for division by zero
  it('div(10, 0) should return "Error: Division by zero" (PASS)', () => {
    expect(div(10, 0)).to.equal('Error: Division by zero');
  });
});

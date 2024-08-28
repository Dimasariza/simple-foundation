import { describe, test, expect } from "@jest/globals"

function sum(num1: number, num2: number) {
  return num1 + num2
}

describe('Sum function', () =>{
    test('Returns correct value', () =>{
        expect(sum(2, 3)).toEqual(5)
    })
})
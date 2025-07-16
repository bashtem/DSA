import { isBracketValid } from "../main";

describe("Brackets validity Tests", () => {
    
  describe("Happy Path!", () => {
    test("first ", () => {
        let res = isBracketValid("[{}]")
        expect(res).toBeTruthy()
    });
    
    test("second ", () => {
        let res = isBracketValid("(()())")
        expect(res).toBeTruthy()
    });

    test("third ", () => {
        let res = isBracketValid("[]{}({})")
        expect(res).toBeTruthy()
    });

    test("fourth ", () => {
        let res = isBracketValid("[][][[[]]]([])()")
        expect(res).toBeTruthy()
    });

  });

  describe("Sad Path!", () => {

    test('fifth', () => {
      let res = isBracketValid("{]{}")
      expect(res).toBeFalsy()
    });
    
    test('sixth', () => {
      let res = isBracketValid("(()()[}]")
      expect(res).toBeFalsy()
    });
    
    test('seventh', () => {
      let res = isBracketValid("{]")
      expect(res).toBeFalsy()
    });
    
    test('eighth', () => {
      let res = isBracketValid("({}[})")
      expect(res).toBeFalsy()
    });
    
  });
});

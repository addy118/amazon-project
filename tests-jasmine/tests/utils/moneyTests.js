import { formatCurrency } from "../../../scripts/utils/money.js";

export function testFormatCurrency() {
  describe("formatCurrency", () => {
    it("converts cents to dollars", () => {
      expect(formatCurrency(2095)).toEqual("20.95");
    });

    it("works with 0", () => {
      expect(formatCurrency(0)).toEqual("0.00");
    });

    describe("rounding cents", () => {
      it("rounds up cents", () => {
        expect(formatCurrency(2000.5)).toEqual("20.01");
      });

      it("rounds down cents", () => {
        expect(formatCurrency(2000.4)).toEqual("20.00");
      });
    });
  });
}

export class Pair {
  private readonly _firstValue: string;
  private readonly _secondValue: string;

  constructor(firstValue: string, secondValue: string) {
    this._firstValue = firstValue!;
    this._secondValue = secondValue!;
  }

  get firstValue(): string {
    return this._firstValue;
  }

  get secondValue(): string {
    return this._secondValue;
  }
}

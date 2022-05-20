import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CalculatorAngular';
  input: string = '';
  result: string = '';
  private number: any;

  pressNum(num: string) {
    //Nullával nem indulhat az input
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }
    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos) pos = this.input.lastIndexOf('-');
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    // + művelettel sem indulhat az input. A negatív szám az működik
    if (this.input.length === 0 && op === '+') return;
    //Egyszerre csak egy művelet menjen végbe és mindig az utolsó
    const lastKey = this.input[this.input.length - 1];
    if (lastKey == '-' || lastKey == '+') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
    this.input = this.input + op;
    this.calcAnswer();
  }

  clear() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  allClear() {
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];
    if (lastKey === '+') {
      formula = formula.substr(0, formula.length - 1);
    }
    lastKey = formula[formula.length - 1];
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
  }
}

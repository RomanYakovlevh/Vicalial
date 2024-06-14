import { Workspace, WorkspaceEntry } from "./Workspace";
import { Matrix } from "./Matrix";
import { MatrixSelection } from "./MatrixOperations/MatrixSelection";
import { MatrixAddition } from "./MatrixOperations/MatrixAddition";
import { MatrixSubstraction } from "./MatrixOperations/MatrixSubstraction";
import { MatrixMultiplication } from "./MatrixOperations/MatrixMultiplication";
import { MatrixTransposition } from "./MatrixOperations/MatrixTransposition";
import { MatrixInversion } from "./MatrixOperations/MatrixInversion";
import { MatrixElemWiseMultiplication } from "./MatrixOperations/MatrixElemWiseMultiplication";
import { MatrixReplace } from "./MatrixOperations/MatrixReplace";
import { MatrixSwap } from "./MatrixOperations/MatrixSwap";
import { MatrixSize } from "./MatrixOperations/MatrixSize";
import { MatrixAppendRows } from "./MatrixOperations/MatrixAppendRows";
import { MatrixAppendCols } from "./MatrixOperations/MatrixAppendCols";
import { PlotStatement } from "./PlotStatement";
import { MatrixLPMinimize } from "./MatrixOperations/MatrixLPMinimize";
import { MatrixMultiplyByConstant } from "./MatrixOperations/MatrixMultiplyByConstant";
import MethodArguments from "@/components/method_argument_types/MethodArguments.vue";
import { WorkspaceVersionUpdateFlag } from "@/services/WorkspaceVersionUpdateFlag";

//Todo: ideally, we need to replace current .execute(..) methods with methods that would accept Array<MethodArgumentResult> as argument, but right I don't have time (December 2023)
export function tempWayToParseArgumentResults(
  matrixMethod: MatrixMethod,
  methodArgumentResults: Array<MethodArgumentResult>
) {
  if (matrixMethod.name() === "Background Color") {
    const selectionArgumentOpt = methodArgumentResults.find(
      (x) => x.getType() === "SelectionArgumentResult"
    );
    const setBackgroundColorOpt = methodArgumentResults.find(
      (x) => x.getType() === "SetBackgroundColorChoiceResult"
    );
    if (
      selectionArgumentOpt !== undefined &&
      selectionArgumentOpt !== undefined
    ) {
      const selectionArgument = selectionArgumentOpt as SelectionArgumentResult;
      const setBackgroundColor =
        setBackgroundColorOpt as SetBackgroundColorChoiceResult;
      const workspace = new Workspace();
      workspace.list = selectionArgument.values;
      return (matrixMethod as SetBackgroundColorMethod).setBackgroundColor(
        workspace,
        setBackgroundColor.color
      );
    } else {
      throw new Error("Not enough arguments found");
    }
  } else {
    const replaceInParentOpt = methodArgumentResults.find(
      (x) => x.getType() === "ReplaceInParentCheckboxResult"
    );
    let replaceInParent = false;
    if (replaceInParentOpt !== undefined) {
      replaceInParent = (replaceInParentOpt as ReplaceInParentCheckboxResult)
        .checked;
    }

    const selectionArgumentOpt = methodArgumentResults.find(
      (x) => x.getType() === "SelectionArgumentResult"
    );
    if (selectionArgumentOpt !== undefined) {
      const selectionArgument = selectionArgumentOpt as SelectionArgumentResult;
      const workspace = new Workspace();
      workspace.list = selectionArgument.values;
      return matrixMethod.execute(
        workspace,
        replaceInParent,
        selectionArgument.appendages
      );
    } else {
      throw new Error("Not enough arguments found");
    }
  }
}

export interface MethodArgumentDescription {
  getComponentName(): string;
}

export interface MethodArgumentResult {
  getType(): string;
}

export enum MethodSymbolPosition {
  Prefix,
  AfterFirstArgument,
  Suffix,
}

export class LimitedSelectionArgumentDescription implements MethodArgumentDescription {
  argumentNumberLimit: number;
  symbol: string;
  symbolPosition: MethodSymbolPosition;
  appendagesOn: Boolean;

  constructor(
    argumentNumberLimit: number,
    symbol: string,
    symbolPosition: MethodSymbolPosition,
    appendagesOn: Boolean
  ) {
    this.argumentNumberLimit = argumentNumberLimit;
    this.symbol = symbol;
    this.symbolPosition = symbolPosition;
    this.appendagesOn = appendagesOn;
  }

  getComponentName() {
    return "LimitedSelectionComponent";
  }
}

export class InfiniteSelectionArgumentDescription implements MethodArgumentDescription {
  symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  getComponentName() {
    return "InfiniteSelectionComponent";
  }
}

export class SelectionArgumentResult implements MethodArgumentResult {
  values: Array<WorkspaceEntry>;
  appendages: Array<string>;
  constructor(values: Array<WorkspaceEntry>, appendages: Array<string>) {
    this.values = values;
    this.appendages = appendages;
  }

  getType(): string {
    return "SelectionArgumentResult";
  }
}

export class ReplaceInParentCheckboxDescription implements MethodArgumentDescription {
  getComponentName() {
    return "ReplaceInParentCheckboxComponent";
  }
}

export class ReplaceInParentCheckboxResult implements MethodArgumentResult {
  checked: boolean;
  constructor(checked: boolean) {
    this.checked = checked;
  }

  getType(): string {
    return "ReplaceInParentCheckboxResult";
  }
}

export class SetBackgroundColorChoiceDescription implements MethodArgumentDescription {
  getComponentName(): string {
    return "SetBackgroundColorChoiceComponent";
  }
}

export class SetBackgroundColorChoiceResult implements MethodArgumentResult {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  getType(): string {
    return "SetBackgroundColorChoiceResult";
  }
}

export class LinearProgrammingTableViewDescription implements MethodArgumentDescription {
  getComponentName(): string {
    return "LinearProgrammingTableViewComponent";
  }
}

export class LinearProgrammingTableViewResult implements MethodArgumentResult {
  getType(): string {
    return "LinearProgrammingTableViewResult";
  }
}

export interface MatrixMethod {
  name(): string;

  desription(): string;

  arguments(): Array<MethodArgumentDescription>;

  symbol(): { type: number; value: string }; // 0 - stands for prefix, 1 - midfx (only for 2 args), 2 - postfix

  execute(
    workspace: Workspace,
    inParent: Boolean,
    appendages: string[]
  ): Array<Matrix> | Array<PlotStatement>;
}

export class MultiplyByConstant implements MatrixMethod {
  name(): string {
    return "Multiply by Constant";
  }

  desription(): string {
    return "Allows to multiply any selection by coefficient.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(1, "", MethodSymbolPosition.Prefix, true),
      new ReplaceInParentCheckboxDescription(),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Array<Matrix> {
    return [
      new MatrixMultiplyByConstant(workspace.list[0], inParent, appendages),
    ];
  }
}

export class AddMethod implements MatrixMethod {
  name(): string {
    return "Add";
  }

  desription(): string {
    return "Adds two matrices/selections of compatible size.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        "+",
        MethodSymbolPosition.AfterFirstArgument,
        true
      ),
      new ReplaceInParentCheckboxDescription(),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 1, value: "+" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Array<Matrix> {
    return [
      new MatrixAddition(
        workspace.list[0],
        workspace.list[1],
        inParent,
        appendages
      ),
    ];
  }
}

export class SubtractMethod implements MatrixMethod {
  name(): string {
    return "Subtract";
  }

  desription(): string {
    return "Subtracts two matrices/selections of compatible size.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        "-",
        MethodSymbolPosition.AfterFirstArgument,
        true
      ),
      new ReplaceInParentCheckboxDescription(),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 1, value: "-" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Array<Matrix> {
    return [
      new MatrixSubstraction(
        workspace.list[0],
        workspace.list[1],
        inParent,
        appendages
      ),
    ];
  }
}

export class MultiplyMethod implements MatrixMethod {
  name(): string {
    return "Multiply";
  }

  desription(): string {
    return "Multiplies two matrices/selections of compatible size.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        "*",
        MethodSymbolPosition.AfterFirstArgument,
        true
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 1, value: "*" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Array<Matrix> {
    return [
      new MatrixMultiplication(
        workspace.list[0],
        workspace.list[1],
        appendages
      ),
    ];
  }
}

export class TransposeMethod implements MatrixMethod {
  name(): string {
    return "Transpose";
  }

  desription(): string {
    return "Transposes matrix or selection.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(1, "^T", MethodSymbolPosition.Suffix, true),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 2, value: "^T" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixTransposition(workspace.list[0], appendages)];
  }
}

export class InverseMethod implements MatrixMethod {
  name(): string {
    return "Inverse";
  }

  desription(): string {
    return "Inverses square matrix or selection.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(1, "^-1", MethodSymbolPosition.Suffix, true),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 2, value: "^-1" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixInversion(workspace.list[0], appendages)];
  }
}

export class ElementWiseProductMethod implements MatrixMethod {
  name(): string {
    return "Element-Wise Product";
  }

  desription(): string {
    return "Multiplies element-wise two matrices/selections of compatible size.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        ".*",
        MethodSymbolPosition.AfterFirstArgument,
        true
      ),
      new ReplaceInParentCheckboxDescription(),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 1, value: ".*" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Array<Matrix> {
    return [
      new MatrixElemWiseMultiplication(
        workspace.list[0],
        workspace.list[1],
        inParent,
        appendages
      ),
    ];
  }
}

export class ReplaceMethod implements MatrixMethod {
  name(): string {
    return "Replace";
  }

  desription(): string {
    return "Replaces selection from first argument with selection from second argument. Returns whole parent of first selection with replacement.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        "replace",
        MethodSymbolPosition.Prefix,
        false
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "replace" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixReplace(workspace.list[0], workspace.list[1])];
  }
}

export class SwapMethod implements MatrixMethod {
  name(): string {
    return "Swap";
  }

  desription(): string {
    return "Swaps places of selections from first and second argument.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        "swap",
        MethodSymbolPosition.Prefix,
        false
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "swap" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    if (workspace.list[0].parent.id !== workspace.list[1].parent.id) {
      return [
        new MatrixReplace(workspace.list[0], workspace.list[1]),
        new MatrixReplace(workspace.list[1], workspace.list[0]),
      ];
    } else {
      return [new MatrixSwap(workspace.list[0], workspace.list[1])];
    }
  }
}

export class SizeMethod implements MatrixMethod {
  name(): string {
    return "Size";
  }

  desription(): string {
    return "Returns 1-by-2 matrix where left element equals to amount of rows in selection/matrix, and right element is equal to amount of columns.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        1,
        "size of",
        MethodSymbolPosition.Prefix,
        false
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "size of" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixSize(workspace.list[0])];
  }
}

export class SelectMethod implements MatrixMethod {
  name(): string {
    return "Select";
  }

  desription(): string {
    return "Takes any amount of selections as arguments, as long as they all are from the same matrix, and returns new matrix made out of these selections.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [new InfiniteSelectionArgumentDescription("select")];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "select" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixSelection(workspace.list)];
  }
}

/*
export class SliceMethod implements MatrixMethod {
    name(): string {
        return "Slice"
    }

    desription(): string {
        return "Takes two arguments, both of them single-element selections from same matrix. Returns new matrix with all elements that were between selected elements, including selected elements themselves."
    }

    arguments(): { selections: number; replaceInParent: Boolean; mutateSelf: Boolean } {
        return { selections: 2, replaceInParent: false, mutateSelf: true } // 
    }

    symbol(): { type: number; value: string } {
        return {type: 0, value: "slice"}
    }
}
*/

export class AppendRowsMethod implements MatrixMethod {
  name(): string {
    return "Append Rows";
  }

  desription(): string {
    return "Appends sideways two matrices/selections of same row amount.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        "append rows",
        MethodSymbolPosition.Prefix,
        false
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "append rows" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixAppendRows(workspace.list[0], workspace.list[1])];
  }
}

export class AppendColumnsMethod implements MatrixMethod {
  name(): string {
    return "Append Columns";
  }

  desription(): string {
    return "Appends vertically two matrices/selections of same columns amount.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        2,
        "append columns",
        MethodSymbolPosition.Prefix,
        false
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "append columns" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixAppendCols(workspace.list[0], workspace.list[1])];
  }
}

export class PlotMethod implements MatrixMethod {
  name(): string {
    return "Plot";
  }

  desription(): string {
    return "Plots matrix/selection.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        1,
        "plot",
        MethodSymbolPosition.Prefix,
        false
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "plot" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ) {
    return [new PlotStatement(workspace.list[0])];
  }
}

export class ExportMethod implements MatrixMethod {
  name(): string {
    return "Export";
  }

  desription(): string {
    return "Allows to export matrix or selection in downloadable formats.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        1,
        "export",
        MethodSymbolPosition.Prefix,
        false
      ),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "export" };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [];
  }
}

export class LinearProgrammingMinimizeMethod implements MatrixMethod {
  name(): string {
    return "Linear Programming: Minimize";
  }

  desription(): string {
    return "Takes matrix as if it is a simplex table, and finds minimum of a objective function. Objective function - is a first row of the matrix, constraint coefficients - first column of matrix. Solver treats constrains as if they are equalities.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new LimitedSelectionArgumentDescription(
        1,
        "minimize ",
        MethodSymbolPosition.Prefix,
        false
      ),
      new LinearProgrammingTableViewDescription()
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "minimize " };
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [new MatrixLPMinimize(workspace.list[0])];
  }
}

export class SetBackgroundColorMethod implements MatrixMethod {
  name(): string {
    return "Background Color";
  }

  desription(): string {
    return "Sets background color of selected cells to desired color.";
  }

  arguments(): Array<MethodArgumentDescription> {
    return [
      new InfiniteSelectionArgumentDescription("background color "),
      new SetBackgroundColorChoiceDescription(),
    ];
  }

  symbol(): { type: number; value: string } {
    return { type: 0, value: "color " };
  }

  setBackgroundColor(entries: Workspace, color: string) {
    entries.list.forEach((entry) => {
      const indexesToColor = entry.selection.getAsIndexesFor(
        entry.parent.asList2D()
      );
      indexesToColor.forEach((x) => {
        entry.parent.setBackgroundColorFor(x.row, x.col, color);
      });
    });
    return [new WorkspaceVersionUpdateFlag()];
  }

  execute(
    workspace: Workspace,
    inParent: Boolean = false,
    appendages: string[] = []
  ): Matrix[] {
    return [];
  }
}

/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../../transformers/IProject";
export declare namespace FunctionalValidateFunctionProgrammer {
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (equals: boolean) => (expression: ts.Expression, declaration: ts.FunctionDeclaration) => ts.ArrowFunction;
    const hookErrors: (props: {
        expression: ts.Expression;
        replacer: ts.Expression;
    }) => ts.CallExpression;
    const getReturnTypeNode: (declaration: ts.FunctionDeclaration, async: boolean) => ts.TypeNode | undefined;
}

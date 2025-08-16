/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../../transformers/IProject";
export declare namespace FunctionAssertReturnProgrammer {
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (equals: boolean) => (expression: ts.Expression, declaration: ts.FunctionDeclaration, init?: ts.Expression) => ts.ArrowFunction;
    const returnStatement: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (equals: boolean) => (expression: ts.Expression, declaration: ts.FunctionDeclaration, wrapper: string) => {
        async: boolean;
        returns: ts.ReturnStatement;
    };
}

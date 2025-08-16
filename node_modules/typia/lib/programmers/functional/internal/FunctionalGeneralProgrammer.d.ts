/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace FunctionalGeneralProgrammer {
    interface IOutput {
        type: ts.Type;
        async: boolean;
    }
    const getReturnType: (checker: ts.TypeChecker) => (declaration: ts.FunctionDeclaration) => IOutput;
}

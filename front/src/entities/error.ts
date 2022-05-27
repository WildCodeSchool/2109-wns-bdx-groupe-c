export interface ExceptionGraphQL {
  validationErrors: ValidationErrorGraphQL[],
  stackTrace: any[],
}

export interface ValidationErrorGraphQL {
  children: any[],
  constraints: ConstraintsErrorGraphQL,
  property: string,
  target: TargetErrorGraphQL,
  value: any,
}

export interface ConstraintsErrorGraphQL {
  [key: string]: string,
}

export interface TargetErrorGraphQL {
  [key: string]: any
}
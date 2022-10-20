import { ValidationError } from "../../errors/validation-error";
import ValidatorRules from "../validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule];
  //@ts-ignore
  method.apply(validator, params);
}
describe("ValidatorRules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some values", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some values");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    // invalid cases
    let arrange: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];
    const error = new ValidationError("The field is required");
    for (const item of arrange) {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    }
    // valid cases
    arrange = [
      {
        value: "test",
        property: "field",
      },
      {
        value: 4,
        property: "field",
      },
      { value: true, property: "field" },
    ];

    for (const item of arrange) {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    }
  });

  test("string validation rule", () => {
    // invalid cases
    let arrange: Values[] = [
      { value: 8, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];
    const error = new ValidationError("The field must be a string");
    for (const item of arrange) {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      });
    }
    // valid cases
    arrange = [
      { value: "test", property: "field" },
      { value: undefined, property: "field" },
      { value: null, property: "field" },
    ];

    for (const item of arrange) {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      });
    }
  });
  test("maxLength validation rule", () => {
    // invalid cases
    let arrange: Values[] = [{ value: "aaaaaa", property: "field" }];
    const error = new ValidationError(
      "The field must be less or equal than 5 characters"
    );
    for (const item of arrange) {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      });
    }
    // valid cases
    arrange = [
      {
        value: "aaaaa",
        property: "field",
      },
    ];

    for (const item of arrange) {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      });
    }
  });

  test("boolean validation rule", () => {
    // invalid cases
    let arrange: Values[] = [
      { value: 8, property: "field" },
      { value: {}, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
    ];
    const error = new ValidationError("The field must be a boolean");
    for (const item of arrange) {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
      });
    }
    // valid cases
    arrange = [
      { value: undefined, property: "field" },
      { value: null, property: "field" },
      { value: true, property: "field" },
    ];

    for (const item of arrange) {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
      });
    }
  });

  it("should throw validation error when combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError(`The field is required`)
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError(`The field must be a string`)
    );

    validator = ValidatorRules.values("aaaaaa", "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError(`The field must be less or equal than 5 characters`)
    );

    validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError(`The field is required`)
    );

    validator = ValidatorRules.values(4, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError(`The field must be a boolean`)
    );
  });

  it("should valid when combine two or more validation rules", () => {
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().string();
    ValidatorRules.values("aaaaa", "field").required().string().maxLength(5);
    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  });
});

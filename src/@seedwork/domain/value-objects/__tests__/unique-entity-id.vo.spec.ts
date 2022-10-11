import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityId unique tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept uuid passed in constructor", () => {
    const uuid = "f6a17767-184a-4f12-8d51-29463077e276";
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept uuid passed in constructor", () => {
    const uuid = "f6a17767-184a-4f12-8d51-29463077e276";
    const vo = new UniqueEntityId(uuid);
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});

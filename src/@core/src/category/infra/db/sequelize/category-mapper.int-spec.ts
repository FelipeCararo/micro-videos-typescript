import { LoadEntityError } from "../../../../@seedwork/domain/errors/load-entity.error";
import { CategorySequelize } from "./category-sequelize";
import { Category } from "../../../domain/entities/category";
import { UniqueEntityId } from "../../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { setupSequelize } from "../../../../@seedwork/infra/testing/helpers/db";

const { CategoryModel, CategoryModelMapper } = CategorySequelize;

describe("CategoryModelMapper Unit Tests", () => {
  setupSequelize({ models: [CategoryModel] });

  it("should throws error when category is invalid", () => {
    const model = CategoryModel.build({
      id: "f6a17767-184a-4f12-8d51-29463077e276",
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail("The category is valid, but it needs throws a LoadEntityError");
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should throws a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = CategoryModel.build({
      id: "f6a17767-184a-4f12-8d51-29463077e276",
    });
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should convert a category model to a category entity", () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      id: "f6a17767-184a-4f12-8d51-29463077e276",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
    const entity = CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category(
        {
          name: "some value",
          description: "some description",
          is_active: true,
          created_at,
        },
        new UniqueEntityId("f6a17767-184a-4f12-8d51-29463077e276")
      ).toJSON()
    );
  });
});

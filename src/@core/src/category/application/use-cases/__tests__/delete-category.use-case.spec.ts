import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throw error when entity not found", () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake id")
    );
  });

  it("should delete a category", async () => {
    const items = [new Category({ name: "movie" })];
    repository.items = items;
    await useCase.execute({ id: items[0].id });

    expect(repository.items).toStrictEqual([]);
  });
});

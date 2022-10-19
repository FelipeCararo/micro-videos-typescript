import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import UseCase from "../../../@seedwork/application/use-case";

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id);
    await this.categoryRepo.delete(entity.id);
  }
}

export type Input = {
  id: string;
};

type Output = void;

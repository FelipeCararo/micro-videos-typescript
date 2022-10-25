import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
} from '@fc/app/category/application';
import { SortDirection } from '@fc/app/@seedwork/domain';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should creates a category', async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: 'f6a17767-184a-4f12-8d51-29463077e276',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toBeCalled();
    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should updates a category', async () => {
    const id = 'f6a17767-184a-4f12-8d51-29463077e276';
    const expectedOutput: CreateCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: UpdateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toBeCalled();
    expect(mockUpdateUseCase.execute).toBeCalledWith({ id, ...input });
    expect(expectedOutput).toStrictEqual(output);
  });
  it('should deletes a category', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = 'f6a17767-184a-4f12-8d51-29463077e276';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toBeCalled();
    expect(mockDeleteUseCase.execute).toBeCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a category', async () => {
    const id = 'f6a17767-184a-4f12-8d51-29463077e276';
    const expectedOutput: CreateCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error
    controller['getUseCase'] = mockGetUseCase;
    const output = await controller.findOne(id);
    expect(mockGetUseCase.execute).toBeCalled();
    expect(mockGetUseCase.execute).toBeCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });
  it('should list categories', async () => {
    const id = 'f6a17767-184a-4f12-8d51-29463077e276';
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id,
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error
    controller['listUseCase'] = mockListUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const output = await controller.search(searchParams);
    expect(mockListUseCase.execute).toBeCalled();
    expect(mockListUseCase.execute).toBeCalledWith(searchParams);
    expect(expectedOutput).toStrictEqual(output);
  });
});

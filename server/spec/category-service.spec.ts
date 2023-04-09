import 'jasmine';
import { Category } from '../../common/category';
import { CategoryService } from '../src/category-service';

describe("O servico de categorias", () => {
    var categoryService : CategoryService;
    var timeout : number;

    beforeEach(() => categoryService = new CategoryService())

    beforeAll(() => {
        process.stdout.write("category-service: ");
    });

    beforeEach(() => {
        categoryService = new CategoryService()
        timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });

    afterAll(() => {
        console.log("\n");
    });

    it("Espera que existam 6 categorias", () => {
        expect(categoryService.get().length).toBe(6);
    });

    it("Espera que a categoria de id 1 seja Pop", () => {
        expect(categoryService.getById(1).name).toBe("Pop");
    });

    it("Espera que a categoria de id 2 seja Rock", () => {
        expect(categoryService.getById(2).name).toBe("Rock");
    });

    it("Espera que a categoria de id 3 seja Electronic", () => {
        expect(categoryService.getById(3).name).toBe("Electronic");
    });

    it("Espera que a categoria de id 4 seja Hip-Hop", () => {
        expect(categoryService.getById(4).name).toBe("Hip-Hop");
    });

    it("Espera que a categoria de id 5 seja KPop", () => {
        expect(categoryService.getById(5).name).toBe("KPop");
    });

    it("Espera que a categoria de id 6 seja Indie", () => {
        expect(categoryService.getById(6).name).toBe("Indie");
    });

});

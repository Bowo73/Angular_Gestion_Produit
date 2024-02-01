import { Product } from "./product";

describe('Product', () => {
    it('should create an instance', () => {
        expect(new Product("name", "texture", 100, "color")).toBeTruthy();
    }); 
});
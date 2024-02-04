export class Product {
    public productId: number;
    public productName: string;
    public productTexture: string;
    public productGrammage: number;
    public productColor: string;
    public constructor(id: number, name: string, texture: string, grammage: number, color: string) {
        this.productId = id;
        this.productName = name;
        this.productTexture = texture;
        this.productGrammage = grammage;
        this.productColor = color;
    }
}

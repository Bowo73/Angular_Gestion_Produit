export class Product {
    public id: number | undefined;
    public productName: string;
    public productTexture: string;
    public productGrammage: number;
    public productColor: string;
    public constructor(name: string, texture: string, grammage: number, color: string) {
        this.productName = name;
        this.productTexture = texture;
        this.productGrammage = grammage;
        this.productColor = color;
    }
}
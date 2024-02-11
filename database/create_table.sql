CREATE TABLE `gestion_produit`.`products` (
  `ProductId` INT NOT NULL AUTO_INCREMENT,
  `ProductName` NVARCHAR(100) NOT NULL,
  `ProductTexture` NVARCHAR(50) NOT NULL,
  `ProductGrammage` INT NOT NULL,
  `ProductColor` NVARCHAR(25) NOT NULL,
  PRIMARY KEY (`ProductId`),
  UNIQUE INDEX `ProductId_UNIQUE` (`ProductId` ASC) VISIBLE);


INSERT INTO `gestion_produit`.`products`
(productId, productName, productTexture, productGrammage, productColor)
VALUES (1, 'Produit 1', 'Texture 1', 100, 'Rouge'),
(2, 'Produit 2', 'Texture 2', 200, 'Bleu'),
(3, 'Produit 3', 'Texture 3', 300, 'Vert'),
(4, 'Produit 4', 'Texture 4', 400, 'Jaune'),
(5, 'Produit 5', 'Texture 5', 500, 'Noir')


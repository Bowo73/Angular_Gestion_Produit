

# GestionProduits
Ce projet est celui de Rafik BOUKHEMIRI et Brice Trappler.
Ce projet contient une base de données MySql avec une table products, une API dotnet et une application Angular.

Ne pas oublier de lancer la bdd et l'API avant de lancer l'Angular. Les scripts pour la bdd se trouvent dans le dossier database.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Commentaires

Ok, c'est un bon travail dans l'ensemble. 
Les parties asynchrones sont maitrisées, on voit que vous savez développer mais il y a quelques problèmes 
dans votre code, sur 2 aspects qui me tiennent à coeur
1. Angular : L'organisation des dossiers / des fichiers : je vous avais recommandé une structure des fichiers en angular (pages ou routeView, service) ou proposé celle d'angular (flat design) et vous êtes entre les 2
2. Angular / API : La gestion des cors, il aurait suffit d'écouter en cours et de mettre en place un proxy-config (on le reverra ensemble)
3. API : Problème d'organisation : la bdd n'est surement pas du ViewModel. (mais je n'ai pas enlevé de points pour ça, les -5 lié aux cors sont les seuls responsable du 15 au lieu du 20 pour la partie API)

Note : 
Angular : 16 (-3 pour organisation et -1 pour cors)
WebApi : 15


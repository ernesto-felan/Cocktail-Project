import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../service/cocktail.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit  {

  displayedColumns: string[] = ['idDrink', 'strDrink', 'strCategory', 'strAlcoholic'];
  alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P','Q','R','S','T','U','V','W','X','Y','Z' ];
  cocktails;
  categories = [];

  constructor(private cocktailService: CocktailService) { }


  ngOnInit(): void {
    this.filterByLetter('A');
    this.getCategories();
  }

  onAlphabetSelction(letterSelected: string) {
    this.filterByLetter(letterSelected);
  }
  

  filterByLetter(letter: string) {
    this.cocktailService.getCocktailsByFirstLetter(letter).subscribe(resp => {
      this.cocktails = resp.drinks;
    })
  }

  filterByName(name: string) {
    this.cocktailService.getCocktailsByName(name).subscribe(resp => {
      this.cocktails = resp.drinks;
    })
  }

  filterByCategory(category: string) {
    this.cocktailService.getCocktailsByCategory(category).subscribe(resp => {
      this.cocktails = resp.drinks;
    })
  }

  getCategories() {
    this.cocktailService.getCategories().subscribe(resp => {
      this.categories = resp.drinks;
    })
  }
}

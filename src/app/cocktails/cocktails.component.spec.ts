import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CocktailService } from '../service/cocktail.service';

import { CocktailsComponent } from './cocktails.component';

describe('CocktailsComponent', () => {
  let component: CocktailsComponent;
  let fixture: ComponentFixture<CocktailsComponent>;
  let cocktailService: jasmine.SpyObj<CocktailService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CocktailService', ['getCocktailsByCategory', 'getCocktailsByName', 'getCocktailsByFirstLetter', 'getCategories']);
    spy.getCocktailsByFirstLetter.and.returnValue(of({drinks: []}));
    spy.getCategories.and.returnValue(of({drinks: []}));
    await TestBed.configureTestingModule({
      declarations: [ CocktailsComponent ],
      providers: [
        { provide: CocktailService, useValue: spy}
      ]
    })
    .compileComponents();

    cocktailService = TestBed.inject(CocktailService) as jasmine.SpyObj<CocktailService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onAlphabetSelction', () => {
    let response = {drinks: [{strDrink: 'A'}]};
    cocktailService.getCocktailsByFirstLetter.and.returnValue(of(response));
    component.onAlphabetSelction('A');
    expect(component.cocktails.indexOf(response.drinks[0])).toBe(0);
  });

  it('should filterByName', () => {
    let response = {drinks: [{strDrink: 'Test'}]};
    cocktailService.getCocktailsByName.and.returnValue(of(response));
    component.filterByName('Test');
    expect(component.cocktails.indexOf(response.drinks[0])).toBe(0);
  });

  it('should filterByCategory', () => {
    let response = {drinks: [{strDrink: 'Test'}]};
    cocktailService.getCocktailsByCategory.and.returnValue(of(response));
    component.filterByCategory('Test');
    expect(component.cocktails.indexOf(response.drinks[0])).toBe(0);
  });
});

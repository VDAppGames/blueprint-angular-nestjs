import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorySelected;
  categoriesFiltered: Category[];
  @Input() public categories: Category[];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.categoriesFiltered = this.categories;
  }

  // Sélectionner une catégorie
  radioCategoriesGroupChange(event) {
    this.categorySelected = event.target.value;
  }

  // Filtrer les catégories via la barre de recherche
  onSearchCategory(event) {
    const val = event.target.value.toLocaleLowerCase().trimLeft().trimRight();
    if (val && val.trim() !== '') {
      this.categoriesFiltered = this.categories.filter(x => x.label.toLocaleLowerCase().includes(val));
    } else {
      this.categoriesFiltered = this.categories;
    }
  }

  // Valider
  validate() {
    this.modalCtrl.dismiss(this.categorySelected);
  }

  // Fermer le modal
  close() {
    this.modalCtrl.dismiss();
  }
}

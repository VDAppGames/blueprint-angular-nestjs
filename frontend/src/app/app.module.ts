import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeResolver } from './resolvers/home.resolver';
import { CategoryComponent } from './modals/category/category.component';
import { ExpenseComponent } from './modals/expense/expense.component';

@NgModule({
  entryComponents: [CategoryComponent, ExpenseComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    ExpenseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HomeResolver, { provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { Routes } from '@angular/router'
import { ShopComponent } from './components/shop/shop'

export const routes: Routes = [
    {path: '', component: ShopComponent},
    {path: '**', redirectTo: ''}
]

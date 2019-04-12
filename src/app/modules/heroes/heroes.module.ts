import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeroRoutingModule} from './heroes-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {HeroRemoveComponent} from './components/hero-remove/hero-remove.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroRoutingModule
  ],
  declarations: [

    HeroRemoveComponent
  ],
  entryComponents: [
    HeroRemoveComponent
  ]
})

export class ServicesModule {
}

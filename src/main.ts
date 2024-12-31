import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync('noop'), provideAnimationsAsync('noop'), provideAnimationsAsync('noop')],
}).catch(err => console.error(err))

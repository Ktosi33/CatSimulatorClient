import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './app/interceptors/token-interceptor.service';

bootstrapApplication(AppComponent, appConfig
)
  .catch((err) => console.error(err));

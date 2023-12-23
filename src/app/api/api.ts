export * from './catController.service';
import { CatControllerService } from './catController.service';
export * from './catImageController.service';
import { CatImageControllerService } from './catImageController.service';
export * from './jwtAuthenticationController.service';
import { JwtAuthenticationControllerService } from './jwtAuthenticationController.service';
export * from './testController.service';
import { TestControllerService } from './testController.service';
export const APIS = [CatControllerService, CatImageControllerService, JwtAuthenticationControllerService, TestControllerService];

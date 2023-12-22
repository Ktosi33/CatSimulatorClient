export * from './jwtAuthenticationController.service';
import { JwtAuthenticationControllerService } from './jwtAuthenticationController.service';
export * from './testController.service';
import { TestControllerService } from './testController.service';
export const APIS = [JwtAuthenticationControllerService, TestControllerService];

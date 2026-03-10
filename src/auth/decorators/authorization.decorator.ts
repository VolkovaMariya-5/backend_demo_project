import { applyDecorators, UseGuards } from "@nestjs/common";
import { JWTGuard } from "../guards/auth.guard";


export function Authorization() {
 return applyDecorators(
   UseGuards(JWTGuard));
 }
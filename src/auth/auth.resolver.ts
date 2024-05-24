import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { RegistrationDto } from "./dto/registration.dto";
import { AuthResponseDto } from "./dto/registration.response.dto";

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation((returns) => AuthResponseDto)
    async registerUser(@Args ('registerData') data: RegistrationDto): Promise<AuthResponseDto> {
        return this.authService.registerUser(data)
    }
}
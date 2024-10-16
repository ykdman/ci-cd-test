import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/req.dto';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User API')
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '신규 사용자 추가' })
  @ApiCreatedResponse({
    description: '신규 사용자 추가',
    type: User,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiBody({
    description: '신규 사용자 정보',
    type: CreateUserDto,
  })
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await firstValueFrom(await this.userService.createUser(createUserDto));
    // * 회원가입 성공 시, JWT 토큰 response

    if (createdUser.status === HttpStatus.CREATED) {
      const accessToken = (await this.authService.generateAccessToken(createdUser.data.email))
        .access_token;
      const refreshToken = (await this.authService.generateRefreshToken(createdUser.data.email))
        .refresh_token;

      const clientResponse = {
        accessToken,
        refreshToken,
        url: this.configService.get<string>('network.CLIENT_MAIN_URL'),
      };

      return clientResponse;
    } else {
      throw new UnauthorizedException('회원가입에 실패 했습니다.');
    }
  }

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  public async getUserInfoByEmail(@Query('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }
}

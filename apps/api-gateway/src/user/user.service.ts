import { MESSAGE } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/req.dto';

@Injectable()
export class UserService {
  public constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return await this.userClient.send(MESSAGE.USER.CREATE_USER, { ...createUserDto });
  }

  public async findUserByEmail(email: string) {
    return await this.userClient.send(MESSAGE.USER.FIND_USER_BY_EMAIL, { email });
  }

  public async loginOrCreateUser(email: string, nickname: string) {
    return await this.userClient.send(MESSAGE.USER.LOGIN_OR_CREATE_USER, { email, nickname });
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hello',
    });
  }

  async validate(payload) {
    console.log(payload);

    return {
      userId:payload.userId,
      mobile: payload.mobile,
      email: payload.email,
      type: payload.type,
    };
  }
}

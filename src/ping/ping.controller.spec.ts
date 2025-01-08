import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';
import { PingResponseDto } from './dto/ping.dto';
describe('PingController', () => {
  let controller: PingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
    }).compile();

    controller = module.get<PingController>(PingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "pong" for GET /ping', () => {
    expect(controller.ping()).toBe('pong');
  });

  it('should return correct response for GET /ping/print', () => {
    const message = 'test message';
    const expectedResponse: PingResponseDto = {
      status: 'ok',
      response: `You sent: ${message}`,
    };
    expect(controller.print(message)).toEqual(expectedResponse);
  });

  it('TEST GET /ping/print', () => {
    const message = 'Test';

    const expectedResponse: PingResponseDto = {
      status: 'ok',
      response: `You sent: ${message}`,
    };

    expect(controller.print(message)).toEqual(expectedResponse);
  });
});

import { Controller, Param, Sse } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Observable, defer, map, repeat } from 'rxjs';
import { Public } from 'src/shared/decorators/public.decorator';
interface MessageEvent {
  data: string | object;
}
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) { }

  @Public()
  @Sse(':patientId') // server sent emitter
  async sendEvent(@Param('patientId') id: string): Promise<Observable<MessageEvent>> {
    return defer(() => this.streamingService.getResults(id)).pipe(
      repeat({
        delay: 1000,
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }
}

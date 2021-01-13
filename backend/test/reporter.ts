import { Reporter, Context } from '@jest/reporters';
import { AggregatedResult } from '@jest/test-result';
import { RemoteLight } from '../../light/dist/service/LightService';

export default class CustomReporter implements Pick<Reporter, 'onRunComplete'> {
  async onRunComplete(_: Set<Context>, results: AggregatedResult) {
    const remoteLight = await new RemoteLight();
    await remoteLight.setInitialInfo();

    if (results.numFailedTests) {
      await remoteLight.codeRed();
    } else {
      await remoteLight.codeGreen();
    }
  }
}

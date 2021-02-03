import {
  DOT_23_TEST_OPTIONS,
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  testBaseTxInfo,
} from '../../util';
import { rejectAnnouncement } from './rejectAnnouncement';

describe('proxy::rejectAnnouncement', () => {
  it('should work', () => {
    const unsigned = rejectAnnouncement(
      TEST_METHOD_ARGS.proxy.rejectAnnouncement,
      TEST_BASE_TX_INFO,
      DOT_23_TEST_OPTIONS
    );

    testBaseTxInfo(unsigned);

    expect(unsigned.method).toBe(
      '0x1d088eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48474235772ae94433aee7d1befac0bfcc35fd0b5dfcf0cfc14bba7d5bbe35b778'
    );
  });
});

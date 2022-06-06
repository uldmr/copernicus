import { LayerChannel } from '../constants';

/** Scene Layer */
export interface ILayer {
  /** Index of Layer from 0 to 31 */
  channel: LayerChannel;

  /** Title of Layer */
  title: string;

  /** Whether Layer enabled by default or not */
  enabled?: boolean;
}

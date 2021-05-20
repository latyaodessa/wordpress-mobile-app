import {decode} from "html-entities";

export function executeDecode(html?: string) {
  return html ? decode(html) : '';
}

import EventEmitter from "eventemitter3";

import { container } from "../../environment/container";
import { Events, Identifiers } from "../../environment/container.models";
import { State } from "../../environment/state";

export const emitter = (): EventEmitter => container.get(Identifiers.EventEmitter);

export const emitProfileChanged = (): boolean => emitter().emit(Events.ProfileChanged, { id: State.profile().id() })

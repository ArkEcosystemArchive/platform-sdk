import EventEmitter from "eventemitter3";

import { IProfile } from "../../contracts";
import { container } from "../../environment/container";
import { Events, Identifiers } from "../../environment/container.models";

export const emitter = (): EventEmitter => container.get(Identifiers.EventEmitter);

export const emitProfileChanged = (profile: IProfile): boolean => emitter().emit(Events.ProfileChanged, { id: profile.id() });

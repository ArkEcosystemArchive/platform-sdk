import { pqueueSettled } from "../../../helpers/queue";
import { Profile } from "../profiles/profile";
import { ProfileRepository } from "../repositories/profile-repository";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { IProfile, IWalletService } from "../../../contracts";

export class WalletService implements IWalletService {
	//
}

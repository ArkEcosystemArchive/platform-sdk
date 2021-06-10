import { IPortfolio, IPortfolioEntry, IProfile } from "../../../contracts";
export declare class Portfolio implements IPortfolio {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IPortfolio.breakdown} */
	breakdown(): IPortfolioEntry[];
}

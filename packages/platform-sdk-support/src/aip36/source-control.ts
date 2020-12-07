import { Builder } from "./builder";
import { SourceControlItem } from "./contracts";

export class SourceControl extends Builder {
	public bitbucket(value: string): void {
		this.push<SourceControlItem>("sourceControl", { type: "bitbucket", value });
	}

	public github(value: string): void {
		this.push<SourceControlItem>("sourceControl", { type: "github", value });
	}

	public gitlab(value: string): void {
		this.push<SourceControlItem>("sourceControl", { type: "gitlab", value });
	}

	public npm(value: string): void {
		this.push<SourceControlItem>("sourceControl", { type: "npm", value });
	}
}

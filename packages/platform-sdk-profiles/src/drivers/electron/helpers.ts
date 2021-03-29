import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { ProcessRender } from "./contracts";

export const communicate = async <T = any>(event: string, data: any): Promise<T> => container.get<ProcessRender>(Identifiers.ProcessRenderer).invoke(event, data);

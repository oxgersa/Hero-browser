import ICommandMeta from '@ulixee/hero-interfaces/ICommandMeta';
import ICommandTimelineOffset from '@ulixee/hero-interfaces/ICommandTimelineOffset';
import ICommandWithResult from '../interfaces/ICommandWithResult';
export default class CommandFormatter {
    static toString(command: ICommandMeta): string;
    static parseResult(meta: ICommandMeta & ICommandTimelineOffset): ICommandWithResult;
}
export declare function formatJsPath(path: any): string;

/// <reference types="node" />
import IResourceMeta from '@ulixee/unblocked-specification/agent/net/IResourceMeta';
import { Database as SqliteDatabase } from 'better-sqlite3';
import IResourceType from '@ulixee/unblocked-specification/agent/net/IResourceType';
import SqliteTable from '@ulixee/commons/lib/SqliteTable';
import IResourceSummary from '@ulixee/hero-interfaces/IResourceSummary';
import IResourceProcessingDetails from '@ulixee/unblocked-agent/interfaces/IResourceProcessingDetails';
export default class ResourcesTable extends SqliteTable<IResourcesRecord> {
    constructor(db: SqliteDatabase);
    updateReceivedTime(id: number, timestamp: number): void;
    updateSeenAtCommandId(id: number, seenAtCommandId: number): void;
    updateBrowserRequestId(id: number, data: {
        tabId: number;
        browserRequestId: string;
    }): void;
    get(id: number): IResourcesRecord;
    getMeta(id: number, includeBody: boolean): Promise<IResourceMeta>;
    save(record: IResourcesRecord): void;
    mergeWithExisting(resourceId: number, existingResource: IResourceMeta, newResourceDetails: IResourceMeta, resourceFailedEvent: IResourceProcessingDetails, error?: Error): void;
    insert(tabId: number, meta: IResourceMeta, postData: Buffer, body: Buffer, extras: IResourceProcessingDetails, error?: Error): void;
    withResponseTimeInRange(tabId: number, startTime: number, endTime: number): IResourceSummary[];
    filter(filters: {
        hasResponse?: boolean;
        isGetOrDocument?: boolean;
    }): IResourceSummary[];
    getResponse(resourceId: number): Pick<IResourcesRecord, 'responseEncoding' | 'responseHeaders' | 'statusCode' | 'responseData'>;
    getResourcePostDataById(resourceId: number): Buffer | null;
    getResourceBodyById(resourceId: number, decompress?: boolean): Promise<Buffer>;
    static toResourceSummary(record: IResourcesRecord): IResourceSummary;
    static getErrorString(error: Error | string): string;
}
export interface IResourcesRecord {
    id: number;
    devtoolsRequestId: string;
    tabId: number;
    frameId: number;
    socketId: number;
    protocol: string;
    type: IResourceType;
    receivedAtCommandId: number;
    seenAtCommandId: number;
    requestMethod: string;
    requestUrl: string;
    requestHeaders: string;
    requestTrailers?: string;
    requestTimestamp: number;
    requestPostData?: string;
    redirectedToUrl?: string;
    statusCode: number;
    statusMessage: string;
    responseUrl: string;
    responseHeaders: string;
    responseTrailers?: string;
    responseTimestamp: number;
    responseEncoding: string;
    responseData?: Buffer;
    dnsResolvedIp?: string;
    usedArtificialCache: boolean;
    responseIntercepted: boolean;
    isHttp2Push: boolean;
    requestOriginalHeaders: string;
    responseOriginalHeaders: string;
    httpError: string;
    browserLoadedTimestamp?: number;
    browserServedFromCache?: 'service-worker' | 'disk' | 'prefetch' | 'memory';
    browserLoadFailure?: string;
    browserBlockedReason?: string;
    browserCanceled?: boolean;
    documentUrl: string;
}
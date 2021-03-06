// Type definitions for SuperAgent 3.5
// Project: https://github.com/visionmedia/superagent
// Definitions by: Nico Zelaya <https://github.com/NicoZelaya/>
//                 Michael Ledin <https://github.com/mxl/>
//                 Pap Lőrinc <https://github.com/paplorinc/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

/// <reference types="node" />

import * as fs from 'fs';
import * as https from 'https';
import * as stream from 'stream';

type CallbackHandler = (err: any, res: request.Response) => void;

type Serializer = (obj: any) => string;

declare const request: request.SuperAgentStatic;

declare namespace request {
    interface SuperAgentRequest extends Request {
        agent(agent?: https.Agent): this;

        cookies: string;
        method: string;
        url: string;
    }
    interface SuperAgentStatic extends SuperAgent<SuperAgentRequest> {
        (url: string): SuperAgentRequest;
        // tslint:disable-next-line:unified-signatures
        (method: string, url: string): SuperAgentRequest;

        agent(): SuperAgent<SuperAgentRequest>;
        serialize: { [type: string]: Serializer };
    }

    interface SuperAgent<Req extends SuperAgentRequest> extends stream.Stream {
        attachCookies(req: Req): void;
        checkout(url: string, callback?: CallbackHandler): Req;
        connect(url: string, callback?: CallbackHandler): Req;
        copy(url: string, callback?: CallbackHandler): Req;
        del(url: string, callback?: CallbackHandler): Req;
        delete(url: string, callback?: CallbackHandler): Req;
        get(url: string, callback?: CallbackHandler): Req;
        head(url: string, callback?: CallbackHandler): Req;
        lock(url: string, callback?: CallbackHandler): Req;
        merge(url: string, callback?: CallbackHandler): Req;
        mkactivity(url: string, callback?: CallbackHandler): Req;
        mkcol(url: string, callback?: CallbackHandler): Req;
        move(url: string, callback?: CallbackHandler): Req;
        notify(url: string, callback?: CallbackHandler): Req;
        options(url: string, callback?: CallbackHandler): Req;
        parse(fn: (res: Response, callback: (err: Error | null, body: any) => void) => void): this;
        patch(url: string, callback?: CallbackHandler): Req;
        post(url: string, callback?: CallbackHandler): Req;
        propfind(url: string, callback?: CallbackHandler): Req;
        proppatch(url: string, callback?: CallbackHandler): Req;
        purge(url: string, callback?: CallbackHandler): Req;
        put(url: string, callback?: CallbackHandler): Req;
        report(url: string, callback?: CallbackHandler): Req;
        saveCookies(res: Response): void;
        search(url: string, callback?: CallbackHandler): Req;
        subscribe(url: string, callback?: CallbackHandler): Req;
        trace(url: string, callback?: CallbackHandler): Req;
        unlock(url: string, callback?: CallbackHandler): Req;
        unsubscribe(url: string, callback?: CallbackHandler): Req;
    }

    interface ResponseError extends Error {
        status: number;
        text: string;
        method: string;
        path: string;
    }

    interface Response extends NodeJS.ReadableStream {
        accepted: boolean;
        badRequest: boolean;
        body: any;
        charset: string;
        clientError: boolean;
        error: ResponseError;
        files: any;
        forbidden: boolean;
        get(header: string): string;
        header: any;
        info: boolean;
        noContent: boolean;
        notAcceptable: boolean;
        notFound: boolean;
        ok: boolean;
        redirect: boolean;
        serverError: boolean;
        status: number;
        statusType: number;
        text: string;
        type: string;
        unauthorized: boolean;
        xhr: XMLHttpRequest;
    }

    interface Request extends Promise<Response> {
        abort(): void;
        accept(type: string): this;
        attach(field: string, file: Blob | Buffer | fs.ReadStream | string, filename?: string): this;
        auth(user: string, name: string): this;
        buffer(val?: boolean): this;
        ca(cert: Buffer): this;
        cert(cert: Buffer | string): this;
        clearTimeout(): this;
        end(callback?: CallbackHandler): this;
        field(name: string, val: string): this;
        get(field: string): string;
        key(cert: Buffer | string): this;
        ok(callback: (res: Response) => boolean): this;
        on(name: 'error', handler: (err: any) => void): this;
        on(name: 'progress', handler: (event: ProgressEvent) => void): this;
        on(name: string, handler: (event: any) => void): this;
        parse(fn: (res: Response, callback: (err: Error | null, body: any) => void) => void): this;
        part(): this;
        pfx(cert: Buffer | string): this;
        pipe(stream: NodeJS.WritableStream, options?: object): stream.Writable;
        query(val: object | string): this;
        redirects(n: number): this;
        responseType(type: string): this;
        retry(count?: number): this;
        send(data?: string | object): this;
        serialize(serializer: Serializer): this;
        set(field: object): this;
        set(field: string, val: string): this;
        timeout(ms: number | { deadline?: number, response?: number }): this;
        type(val: string): this;
        unset(field: string): this;
        use(fn: Plugin): this;
        withCredentials(): this;
        write(data: string | Buffer, encoding?: string): this;
    }

    type Plugin = (req: Request) => void;

    interface ProgressEvent {
        direction: 'download' | 'upload';
        loaded: number;
        percent?: number;
        total?: number;
    }
}

export = request;

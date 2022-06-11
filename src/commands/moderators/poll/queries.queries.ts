/** Types generated for queries found in "src/commands/moderators/poll/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreatePoll' parameters type */
export interface ICreatePollParams {
  channel_id: string | null | void;
  name: string | null | void;
  react_emoji: string | null | void;
  server_id: string | null | void;
}

/** 'CreatePoll' return type */
export interface ICreatePollResult {
  id: string;
}

/** 'CreatePoll' query type */
export interface ICreatePollQuery {
  params: ICreatePollParams;
  result: ICreatePollResult;
}

const createPollIR: any = {"usedParamSet":{"name":true,"server_id":true,"channel_id":true,"react_emoji":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":72}]},{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":83}]},{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":86,"b":96}]},{"name":"react_emoji","required":false,"transform":{"type":"scalar"},"locs":[{"a":99,"b":110}]}],"statement":"INSERT INTO\n\tpolls (name, server_id,channel_id,react_emoji)\nVALUES (:name,:server_id, :channel_id, :react_emoji)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 * 	polls (name, server_id,channel_id,react_emoji)
 * VALUES (:name,:server_id, :channel_id, :react_emoji)
 * RETURNING id
 * ```
 */
export const createPoll = new PreparedQuery<ICreatePollParams,ICreatePollResult>(createPollIR);


/** 'AddMessageToPoll' parameters type */
export interface IAddMessageToPollParams {
  message_id: string | null | void;
  poll_id: string | null | void;
}

/** 'AddMessageToPoll' return type */
export type IAddMessageToPollResult = void;

/** 'AddMessageToPoll' query type */
export interface IAddMessageToPollQuery {
  params: IAddMessageToPollParams;
  result: IAddMessageToPollResult;
}

const addMessageToPollIR: any = {"usedParamSet":{"poll_id":true,"message_id":true},"params":[{"name":"poll_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":64}]},{"name":"message_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":77}]}],"statement":"INSERT INTO\n\tpoll_messages (poll_id, message_id)\nVALUES (:poll_id, :message_id)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 * 	poll_messages (poll_id, message_id)
 * VALUES (:poll_id, :message_id)
 * ```
 */
export const addMessageToPoll = new PreparedQuery<IAddMessageToPollParams,IAddMessageToPollResult>(addMessageToPollIR);


/** 'GetMessagesFromPoll' parameters type */
export interface IGetMessagesFromPollParams {
  poll_id: string | null | void;
}

/** 'GetMessagesFromPoll' return type */
export interface IGetMessagesFromPollResult {
  message_id: string;
}

/** 'GetMessagesFromPoll' query type */
export interface IGetMessagesFromPollQuery {
  params: IGetMessagesFromPollParams;
  result: IGetMessagesFromPollResult;
}

const getMessagesFromPollIR: any = {"usedParamSet":{"poll_id":true},"params":[{"name":"poll_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":60}]}],"statement":"SELECT message_id\nFROM poll_messages\nWHERE poll_id = :poll_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT message_id
 * FROM poll_messages
 * WHERE poll_id = :poll_id
 * ```
 */
export const getMessagesFromPoll = new PreparedQuery<IGetMessagesFromPollParams,IGetMessagesFromPollResult>(getMessagesFromPollIR);


/** 'GetPollsInChannel' parameters type */
export interface IGetPollsInChannelParams {
  channel_id: string | null | void;
  server_id: string | null | void;
}

/** 'GetPollsInChannel' return type */
export interface IGetPollsInChannelResult {
  id: string;
  name: string;
  react_emoji: string;
}

/** 'GetPollsInChannel' query type */
export interface IGetPollsInChannelQuery {
  params: IGetPollsInChannelParams;
  result: IGetPollsInChannelResult;
}

const getPollsInChannelIR: any = {"usedParamSet":{"server_id":true,"channel_id":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":56,"b":65}]},{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":94}]}],"statement":"SELECT id,name,react_emoji\nFROM polls\nWHERE server_id = :server_id\nAND channel_id = :channel_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,name,react_emoji
 * FROM polls
 * WHERE server_id = :server_id
 * AND channel_id = :channel_id
 * ```
 */
export const getPollsInChannel = new PreparedQuery<IGetPollsInChannelParams,IGetPollsInChannelResult>(getPollsInChannelIR);


/** 'GetPoll' parameters type */
export interface IGetPollParams {
  channel_id: string | null | void;
  name: string | null | void;
  server_id: string | null | void;
}

/** 'GetPoll' return type */
export interface IGetPollResult {
  message_id: string;
  name: string;
  poll_id: string;
  react_emoji: string;
}

/** 'GetPoll' query type */
export interface IGetPollQuery {
  params: IGetPollParams;
  result: IGetPollResult;
}

const getPollIR: any = {"usedParamSet":{"server_id":true,"channel_id":true,"name":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":166,"b":175}]},{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":194,"b":204}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":217,"b":221}]}],"statement":"SELECT\n\tpolls.id as poll_id,\n\tname,\n\treact_emoji,\n\tpoll_messages.message_id\nFROM polls\nINNER JOIN poll_messages\nON poll_messages.poll_id = polls.id\nWHERE server_id = :server_id\nAND channel_id = :channel_id\nAND name = :name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 * 	polls.id as poll_id,
 * 	name,
 * 	react_emoji,
 * 	poll_messages.message_id
 * FROM polls
 * INNER JOIN poll_messages
 * ON poll_messages.poll_id = polls.id
 * WHERE server_id = :server_id
 * AND channel_id = :channel_id
 * AND name = :name
 * ```
 */
export const getPoll = new PreparedQuery<IGetPollParams,IGetPollResult>(getPollIR);


/** 'DeletePoll' parameters type */
export interface IDeletePollParams {
  poll_id: string | null | void;
}

/** 'DeletePoll' return type */
export type IDeletePollResult = void;

/** 'DeletePoll' query type */
export interface IDeletePollQuery {
  params: IDeletePollParams;
  result: IDeletePollResult;
}

const deletePollIR: any = {"usedParamSet":{"poll_id":true},"params":[{"name":"poll_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":29,"b":36}]}],"statement":"DELETE\nFROM polls\nWHERE id = :poll_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE
 * FROM polls
 * WHERE id = :poll_id
 * ```
 */
export const deletePoll = new PreparedQuery<IDeletePollParams,IDeletePollResult>(deletePollIR);


/** 'GetReactEmoji' parameters type */
export interface IGetReactEmojiParams {
  channel_id: string | null | void;
  name: string | null | void;
  server_id: string | null | void;
}

/** 'GetReactEmoji' return type */
export interface IGetReactEmojiResult {
  react_emoji: string;
}

/** 'GetReactEmoji' query type */
export interface IGetReactEmojiQuery {
  params: IGetReactEmojiParams;
  result: IGetReactEmojiResult;
}

const getReactEmojiIR: any = {"usedParamSet":{"server_id":true,"channel_id":true,"name":true},"params":[{"name":"server_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":57}]},{"name":"channel_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":86}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":99,"b":103}]}],"statement":"SELECT react_emoji\nFROM polls\nWHERE server_id = :server_id\nAND channel_id = :channel_id\nAND name = :name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT react_emoji
 * FROM polls
 * WHERE server_id = :server_id
 * AND channel_id = :channel_id
 * AND name = :name
 * ```
 */
export const getReactEmoji = new PreparedQuery<IGetReactEmojiParams,IGetReactEmojiResult>(getReactEmojiIR);



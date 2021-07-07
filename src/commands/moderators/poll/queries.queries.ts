/** Types generated for queries found in "src/commands/moderators/poll/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreatePoll' parameters type */
export interface ICreatePollParams {
  name: string | null | void;
  server_id: string | null | void;
  channel_id: string | null | void;
  react_emoji: string | null | void;
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

const createPollIR: any = {"name":"create_poll","params":[{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":92,"b":95,"line":4,"col":9}]}},{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":98,"b":106,"line":4,"col":15}]}},{"name":"channel_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":110,"b":119,"line":4,"col":27}]}},{"name":"react_emoji","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":123,"b":133,"line":4,"col":40}]}}],"usedParamSet":{"name":true,"server_id":true,"channel_id":true,"react_emoji":true},"statement":{"body":"INSERT INTO\n\tpolls (name, server_id,channel_id,react_emoji)\nVALUES (:name,:server_id, :channel_id, :react_emoji)\nRETURNING id","loc":{"a":23,"b":147,"line":2,"col":0}}};

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
  poll_id: string | null | void;
  message_id: string | null | void;
}

/** 'AddMessageToPoll' return type */
export type IAddMessageToPollResult = void;

/** 'AddMessageToPoll' query type */
export interface IAddMessageToPollQuery {
  params: IAddMessageToPollParams;
  result: IAddMessageToPollResult;
}

const addMessageToPollIR: any = {"name":"add_message_to_poll","params":[{"name":"poll_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":241,"b":247,"line":10,"col":9}]}},{"name":"message_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":251,"b":260,"line":10,"col":19}]}}],"usedParamSet":{"poll_id":true,"message_id":true},"statement":{"body":"INSERT INTO\n\tpoll_messages (poll_id, message_id)\nVALUES (:poll_id, :message_id)","loc":{"a":183,"b":261,"line":8,"col":0}}};

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

const getMessagesFromPollIR: any = {"name":"get_messages_from_poll","params":[{"name":"poll_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":354,"b":360,"line":15,"col":17}]}}],"usedParamSet":{"poll_id":true},"statement":{"body":"SELECT message_id\nFROM poll_messages\nWHERE poll_id = :poll_id","loc":{"a":300,"b":360,"line":13,"col":0}}};

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
  server_id: string | null | void;
  channel_id: string | null | void;
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

const getPollsInChannelIR: any = {"name":"get_polls_in_channel","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":454,"b":462,"line":20,"col":19}]}},{"name":"channel_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":482,"b":491,"line":21,"col":18}]}}],"usedParamSet":{"server_id":true,"channel_id":true},"statement":{"body":"SELECT id,name,react_emoji\nFROM polls\nWHERE server_id = :server_id\nAND channel_id = :channel_id","loc":{"a":397,"b":491,"line":18,"col":0}}};

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
  server_id: string | null | void;
  channel_id: string | null | void;
  name: string | null | void;
}

/** 'GetPoll' return type */
export interface IGetPollResult {
  poll_id: string;
  name: string;
  react_emoji: string;
  message_id: string;
}

/** 'GetPoll' query type */
export interface IGetPollQuery {
  params: IGetPollParams;
  result: IGetPollResult;
}

const getPollIR: any = {"name":"get_poll","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":683,"b":691,"line":32,"col":19}]}},{"name":"channel_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":711,"b":720,"line":33,"col":18}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":734,"b":737,"line":34,"col":12}]}}],"usedParamSet":{"server_id":true,"channel_id":true,"name":true},"statement":{"body":"SELECT\n\tpolls.id as poll_id,\n\tname,\n\treact_emoji,\n\tpoll_messages.message_id\nFROM polls\nINNER JOIN poll_messages\nON poll_messages.poll_id = polls.id\nWHERE server_id = :server_id\nAND channel_id = :channel_id\nAND name = :name","loc":{"a":516,"b":737,"line":24,"col":0}}};

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

const deletePollIR: any = {"name":"delete_poll","params":[{"name":"poll_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":795,"b":801,"line":39,"col":12}]}}],"usedParamSet":{"poll_id":true},"statement":{"body":"DELETE\nFROM polls\nWHERE id = :poll_id","loc":{"a":765,"b":801,"line":37,"col":0}}};

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
  server_id: string | null | void;
  channel_id: string | null | void;
  name: string | null | void;
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

const getReactEmojiIR: any = {"name":"get_react_emoji","params":[{"name":"server_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":882,"b":890,"line":44,"col":19}]}},{"name":"channel_id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":910,"b":919,"line":45,"col":18}]}},{"name":"name","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":933,"b":936,"line":46,"col":12}]}}],"usedParamSet":{"server_id":true,"channel_id":true,"name":true},"statement":{"body":"SELECT react_emoji\nFROM polls\nWHERE server_id = :server_id\nAND channel_id = :channel_id\nAND name = :name","loc":{"a":833,"b":936,"line":42,"col":0}}};

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



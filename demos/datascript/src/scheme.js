import {mori, helpers} from "datascript-mori";

const {hashMap} = mori;
const {DB_VALUE_TYPE, DB_TYPE_REF} = helpers;

const scheme = hashMap(
    "tooltip/position", hashMap(DB_VALUE_TYPE, DB_TYPE_REF)
);

export default scheme;

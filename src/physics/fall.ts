import { ElementStatus } from "../types/global.js";

const fall = (item: Object) => {
    (item as { setFallHeight: Function }).setFallHeight(innerHeight);
    (item as { status: ElementStatus }).status = "falling";
}

export default fall;
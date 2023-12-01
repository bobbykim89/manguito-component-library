import type { ColorPalette } from '@bobbykim/manguito-theme';
import type { SocialUrl } from '../index.type';
declare const _default: import("vue").DefineComponent<{
    iconColor: {
        type: import("vue").PropType<ColorPalette>;
        required: true;
        default: string;
    };
    socialLinks: {
        type: import("vue").PropType<SocialUrl>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    iconColor: {
        type: import("vue").PropType<ColorPalette>;
        required: true;
        default: string;
    };
    socialLinks: {
        type: import("vue").PropType<SocialUrl>;
    };
}>>, {
    iconColor: ColorPalette;
}, {}>;
export default _default;

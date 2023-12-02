import { defineComponent, h, computed } from 'vue';
import generateClass from '../../index.js';
export default defineComponent({
    props: {
        direction: {
            type: String,
            default: 'right',
        },
        color: {
            type: String,
            default: 'dark-3',
        },
        textColor: {
            type: String,
            default: 'white',
        },
        width: {
            type: [Number, String],
            default: 80,
        },
        customClass: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const defaultClassList = 'invisible opacity-0 group-hover:visible group-hover:opacity-100 z-[100] tooltip';
        const colorClass = computed(() => {
            /**
             * @param {ColorPalette} color - props
             * @param {ColorPalette} textolor - props
             */
            const { color, textColor } = props;
            const classArray = [
                generateClass('BGCOLOR', color),
                generateClass('TEXTCOLOR', textColor),
            ];
            return classArray.join(' ');
        });
        const tooltipWidth = computed(() => {
            return { width: `${props.width}px` };
        });
        const tooltipDirection = computed(() => {
            switch (props.direction) {
                case 'left':
                    return 'tooltip-left';
                case 'top':
                    return 'tooltip-top';
                case 'bottom':
                    return 'tooltip-bottom';
                default:
                    return 'tooltip-right';
            }
        });
        return () => h('div', {
            class: [
                defaultClassList,
                props.customClass,
                tooltipDirection.value,
                colorClass.value,
            ],
            role: 'tooltip',
            innerHTML: props.title,
            style: [tooltipWidth.value],
        });
    },
});
//# sourceMappingURL=index.js.map
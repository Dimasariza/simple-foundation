import { motion } from "framer-motion";
import { Card, CardProps } from "primereact/card";

const MotionCard = motion<any>(Card);

function AppCard(props: CardProps) {
    const cardProps = {
        ...props,
        className: `${props?.className ?? ""} !fixed bottom-card-bottom right-quick-btn-right w-card-width h-card-height rounded-border-rad`,
        style: {
            border: "1px solid #red",
            background: "white",
            ...props.style
        },
        unstyled: true
    }

    const defaultState = {
        opacity: 0,
        scale: 0.2,
        x: 300,
        y: 300
    };

    return (
        <MotionCard
            {...cardProps}
            initial={defaultState}
            exit={defaultState}
            transition={{
                duration: 0.2
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0
            }}
        >
            {props.children}
        </MotionCard>
    )
}

export default AppCard;